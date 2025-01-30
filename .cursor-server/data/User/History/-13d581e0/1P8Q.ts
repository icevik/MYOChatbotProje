import admin from 'firebase-admin';

const serviceAccount = {
  "type": "service_account",
  "project_id": "myodogrulama1", 
  "private_key_id": "0ba3d87254afcc3b26c404efdcc4a56cfe9bf72b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1wNM6GFOO0h8o\nQBEev20FCIUoveLfe34zq8qaYGIlwKb2zFwzK/V8UD8Lt9eUGWTW72r5ZK+0/2k/\n7Um0pZQIAJ5JZLZQnAddIKkCcEByEJBz9bkmnHXQZgMDssMW+EaUwkAUvDyn02fW\n9BoLc0AUXErVXAzLR7nAGHKO5g3V9Ezb8i547VCmp91J5iLx1MPCGZP/xiFEDkNA\nBKgnEZEGixTFh/FvQAZZVlz9Wneavaz9UDSVKvG0vZWZnFdyz1xPYPY+0cAjz9GL\nXkpAq47u+jLg86JU+SqFXNm7ZnbSNMXs7QSe4xthfSXRAEiUlyOS0KbyLa4g4ZVs\nM7i1s6SDAgMBAAECggEAH4c1/P9oSz+e4QQQFDXfqv5Z3wHlf5/z+fGkgRgUHnln\nXSuBGO1YtbpT3WwELPAkwnYgp+dz5WFi+BBo9zm7zpGQ46lhSOVwD5MRTld7jm3a\nKQtolU6Rz1dK0ZLqbasez0JNDGvE19X/ztVkSTUyWfXSk2VW4NJt4ek7whcdMk5V\ny+D7kxXttMCB98PBoOz4Pe3GEHAgpR4FmSUdy63L4pTAaIb/VmhIBeJT5k2P6HM+\nt2einp2O4ga6kO0/r1wjBHYIpOlhsZ1BRgbttzAuglzWcUwMxOtfCI4OA0ogrMiz\nRKtBE+tPno5W7uLN2YU12MPBxA82liBwYjk4BznxHQKBgQDx/WevpNobWNZwU2+z\naVvGSMikJK+fZOSqFwhDpCi4DeOF6u13+QdGBOdnyXFWnIzy3nywocE47wJqERTX\nJRsD5ta2xwNuNdLtNs/kKq4b+BlOJlQzI/GDDNX3LBdeaG3NAdmwxfirvbNvE3GB\nnUXY8jS/jZsW4dVX1B6+6hL9VQKBgQDARqMZCFnxbfgvoLrtfEbWhPgUYxgxvvI7\nZrFRV3JxzmJtSLWFpXlKXRhYh0CBsqBkT5IQtRynF/RUsYFw9G83e/vFmY91KOLD\nCrPly9EeA0ogTFye8UE2UVTqTGGYUclnNHN5smDKrz1NAvzdOrx1mq8wrtmTn9qK\n1vNt0pBadwKBgQCY9GMlUj3KK0zfkt13uZCYtEid99JKHaurFwPSPWC/dYfqjaOr\nwWwnhdH+eAV7iVhN6vNFcfh/1BLimAlkM7/vp2jv/rrcXokEBzFANvn2E8tq6i8u\nY/mzq9lScjwTIE7G1fSTF48mfrF78/46vv33MqDEsuzkebov2ZPVeH6oQQKBgB2Y\nwfJQfsfTDakHLL7xqlXLEgTRXCAMLG1IWXMT6uHpyuzXjFmOJyVzPxQhfaR5Qocu\nWGWJ+2cdINcIm8wvVA9OXmsEQDjgmkc7loWA4iekifx+xKMSr98UleWa7EruC/p+\n8GeDNbL9VopMM3A6YlgX/2+W+pbmvFUy0TXOe7nxAoGBAK+h4nTWDd0PilY47SpP\nx0m05ixkQ6YcLlaEtMAoeVGMdZzaQYNzyVXMPaU/cVBJXZcg5Q8ca6bQ1yuRjWa5\nUHl/skKV7z1lz/4+zqWASR6XxKgYEmu3SQ89y6I6AN3ayo2UuDJrhmO0PLSG1HCy\nYT1UbkAt6ZAvb3ypO0VVi8Cv\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@myodogrulama1.iam.gserviceaccount.com",
  "client_id": "103957486233707923642",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40myodogrulama1.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "myodogrulama1.firebasestorage.app"
  });
}

export default admin;