# P2P Chat-based Web application

### 💡 Whatsapp clone imitating a few major functionalities such as follows:

- List active users who are online
- Read receipt feature
  - message send (single tick like WhatsApp)
  - message delivery notification (double tick like WhatsApp)
  - message read notification (blue double tick like WhatsApp)
- Authentication with Google single sign-on using firebase.

### 🔗 Links

- [LIVE URL](https://whatsapp-clone-13e3a.web.app)
- [Github REPOSITORY](https://github.com/Kunal-2001/Whatsapp-Web-Clone.git)

### 📂 System Built On

- Operating System (Ubuntu 20.04.3 LTS)
- Node.js v14 (configured by firebase)

### 🔑 Installation and Working

1. Clone the repo
   ```
   https://github.com/Kunal-2001/Whatsapp-Web-Clone.git
   ```
2. Install node packages
   ```
   npm install
   ```
3. Install firebase tools globally

   ```
   npm install -g firebase-tools
   ```

   After installing the firebase tools run `firebase login` to log in via the browser and authenticate the firebase tool.

4. Copy environment variables dummy files and replace them with firebase configurations.
   ```
   cp .example.env .env
   ```

### 📱 Tech Stack and Dependencies

- React.js
- Firebase
  - Authentication
  - Realtime Database
  - Deploy functions

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
