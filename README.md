# SmartSignGPT

SmartSignGPT is an intelligent contract analysis and management platform powered by OpenAI's GPT. Simplify contract review, creation, and signing processes with advanced AI assistance. Built with Next.js and styled with Tailwind CSS, this application offers comprehensive contract analysis, risk assessment, and collaborative features for efficient document management.

## Live Demo
[https://smartsigngpt.vercel.app/](https://smartsigngpt.vercel.app/)

## Features

- Utilize OpenAI's GPT for intelligent contract interpretation and summarization
- Clause-by-clause breakdown with plain language explanations
- Automated identification and highlighting of potential risks and obligations
- Library of customizable templates for various document types
- Secure digital signing capabilities
- Real-time document review and commenting features
- Track document status and engagement metrics
- Access and manage all contracts in one place
- Smart reminders for unsigned documents

## Technologies Used

- **Frontend**: Next.js 14, React
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: MongoDB
- **Real-time Updates**: Firebase
- **AI Integration**: OpenAI API
- **State Management**: React Hooks
- **Deployment**: Vercel

## Use Cases

- Contract review and analysis
- Document creation from templates
- Risk assessment and compliance
- E-signature management
- Team collaboration on documents
- Contract status tracking
- Template management
- Legal document summarization
- Obligation tracking

## Installation Steps

**1. Clone the repository:**
```bash
git clone https://github.com/0xmetaschool/SmartSignGPT.git
cd SmartSignGPT
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up environment variables:**
Create a `.env.local` file in the root directory and add:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
FIREBASE_CONFIG=your_firebase_config
```

**4. Run the development server:**
```bash
npm run dev
```

**5. Open your browser and navigate to** `http://localhost:3000`

## Screenshots



## How to Use the Application

1. Sign up or sign in using authentication
2. Upload a contract or select from templates
3. Review AI-generated summary and analysis
4. Navigate through interactive clause breakdown
5. Track signing status and progress
6. Collaborate with team members
7. Access analytics and insights
8. Manage document templates

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- Multi-language support
- Advanced template customization
- Enhanced analytics dashboard
- API access for developers
- Mobile app development
- Blockchain integration for document verification
- AI-powered negotiation assistance

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or support, please open an issue in the GitHub repository.

## Acknowledgments

- OpenAI for providing the GPT API
- Next.js team for the amazing framework
- Clerk for authentication services
- All contributors and users of SmartSignGPT
