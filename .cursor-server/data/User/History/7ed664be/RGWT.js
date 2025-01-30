const Conversation = require('../models/Conversation');
const Course = require('../models/Course');
const axios = require('axios');

// Yeni mesaj gönder
const sendMessage = async (req, res) => {
    try {
        const { courseId, message } = req.body;
        const userId = req.user._id;

        const course = await Course.findById(courseId);
        if (!course || !course.isActive) {
            return res.status(404).send({ error: 'Ders bulunamadı veya aktif değil' });
        }

        // API isteği yap
        const response = await axios.post(
            `${course.hostAddress}${course.chatbotId}`,
            {
                question: message,
                overrideConfig: {
                    returnSourceDocuments: true
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${course.securityKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Konuşmayı bul veya oluştur
        let conversation = await Conversation.findOne({
            userId,
            courseId
        });

        if (!conversation) {
            conversation = new Conversation({
                userId,
                courseId,
                messages: []
            });
        }

        // Mesajları ekle
        conversation.messages.push(
            { role: 'user', content: message },
            { role: 'assistant', content: response.data.answer }
        );

        await conversation.save();
        res.send(conversation);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Kullanıcının konuşma geçmişini getir
const getUserConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({ userId: req.user._id })
            .populate('courseId')
            .sort({ updatedAt: -1 });
        res.send(conversations);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Belirli bir konuşmanın detayını getir
const getConversationById = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            _id: req.params.id,
            userId: req.user._id
        }).populate('courseId');

        if (!conversation) {
            return res.status(404).send({ error: 'Konuşma bulunamadı' });
        }

        res.send(conversation);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    sendMessage,
    getUserConversations,
    getConversationById
}; 