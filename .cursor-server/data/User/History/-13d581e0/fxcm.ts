import admin from 'firebase-admin';

const serviceAccount = {
  "type": "service_account", 
  "project_id": "myodogrulama1",
  "private_key_id": "AIzaSyBCyqXSL_e1EjLTZorrh6NKnaD9g6FwOk8",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@myodogrulama1.iam.gserviceaccount.com",
  "client_id": "836238037089",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token", 
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40myodogrulama1.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "myodogrulama1.firebasestorage.app",
    projectId: "myodogrulama1",
    messagingSenderId: "836238037089",
    appId: "1:836238037089:web:72c3cd0d133660d10d9a20",
    measurementId: "G-V9WH1YRCP6"
  });
}

export default admin;