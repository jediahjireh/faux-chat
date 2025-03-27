# Faux Chat Application

A realistic messenger-style chat application that uses AI to simulate conversations. This app is designed to look like a regular messaging app but uses Google's Generative AI to respond to messages.

## Features

- **Realistic Messenger UI**: Looks like a standard messaging app with chat bubbles, typing indicators, and timestamps
- **Customisable Contact**: Set the name, profile picture, and personality of your "contact"
- **AI-Powered Responses**: Uses Google's Generative AI to generate contextually relevant responses
- **Online Status Toggle**: Option to show the contact as online or offline
- **Mobile-Responsive Design**: Works well on both desktop and mobile devices

<!-- TOC -->

- [Faux Chat Application](#faux-chat-application)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Key Technologies](#key-technologies)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Development](#development)
    - [Project Structure](#project-structure)
    - [Key Components](#key-components)
      - [1. Main Chat Interface (`app/page.tsx`)](#1-main-chat-interface-apppagetsx)
      - [2. Chat Message Component (`components/chat-message.tsx`)](#2-chat-message-component-componentschat-messagetsx)
      - [3. Profile Settings Component (`components/profile-settings.tsx`)](#3-profile-settings-component-componentsprofile-settingstsx)
    - [Server Actions](#server-actions)
      - [Chat Action (`app/actions/chat.actions.ts`)](#chat-action-appactionschatactionsts)
    - [AI Integration](#ai-integration)
    - [Styling](#styling)
  - [Usage Guide](#usage-guide)
    - [Basic Usage](#basic-usage)
    - [Personality Customisation](#personality-customisation)
    - [Tips for Realistic Conversations](#tips-for-realistic-conversations)
  - [Customisation](#customisation)
    - [UI Customisation](#ui-customisation)
    - [AI Behaviour Customisation](#ai-behaviour-customisation)
  - [Future Enhancements](#future-enhancements)
    - [Voice Notes Feature](#voice-notes-feature)
    - [Voice Call Simulation](#voice-call-simulation)
    - [Additional Planned Features](#additional-planned-features)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
      - [AI Not Responding](#ai-not-responding)
      - [Slow Response Times](#slow-response-times)
      - [Styling Issues](#styling-issues)
    - [Getting Help](#getting-help)
  - [Contributing](#contributing)
    - [Development Guidelines](#development-guidelines)
  - [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Google Generative AI API key

### Key Technologies

- **Frontend:** React, Next.js, Tailwind CSS
- **UI Components:** shadcn/ui
- **AI Integration:** Vercel AI SDK, Google Generative AI
- **State Management:** React useState and useEffect hooks
- **Styling:** Tailwind CSS with shadcn/ui theming

### Installation

1. **Clone the repository:**

   ```zsh
   git clone https://github.com/jediahjireh/faux-chat.git
   cd faux-chat
   ```

2. **Install dependencies:**

   ```zsh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory with the following content:

   ```plaintext
   GOOGLE_GENERATIVE_AI_API_KEY=add_api_key_here
   ```

4. **Start the development server:**

   ```zsh
   npm run dev
   ```

5. **Open your browser:**

Navigate to the default localhost (typically [http://localhost:3000](http://localhost:3000)) to see the application.

### Environment Variables

| Variable                       | Description                      | Required |
| ------------------------------ | -------------------------------- | -------- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | API key for Google Generative AI | Yes      |

## Development

### Project Structure

```plaintext
faux-chat/
├── app/                      # Next.js App Router
│   ├── actions/              # Server Actions
│   │   └── chat.actions.ts   # AI response generation
│   ├── page.tsx              # Main chat interface
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── chat-message.tsx      # Message bubble component
│   ├── profile-settings.tsx  # Contact settings panel
│   └── ui/                   # shadcn/ui components
├── public/                   # Static assets
├── styles/                   # Global styles
├── lib/                      # Utility functions
├── .env.local                # Environment variables (not in repo)
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

### Key Components

#### 1. Main Chat Interface (`app/page.tsx`)

The main chat interface handles:

- Message display and scrolling
- User input handling
- AI response generation via server actions
- Typing indicators
- Contact header display

```typescriptreact
// Simplified example
export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add user message
    // Call server action for AI response
    // Show typing indicator
    // Add AI response after delay
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      {/* Messages */}
      {/* Input form */}
    </div>
  );
}
```

#### 2. Chat Message Component (`components/chat-message.tsx`)

Renders individual message bubbles with different styles for user and AI messages.

```typescriptreact
export default function ChatMessage({ message, isUser, timestamp }) {
  return (
    <div className={isUser ? "justify-end" : "justify-start"}>
      <div className={isUser ? "bg-blue-500 text-white" : "bg-white text-black"}>
        <p>{message}</p>
        <div className="text-xs">{timestamp}</div>
      </div>
    </div>
  );
}
```

#### 3. Profile Settings Component (`components/profile-settings.tsx`)

Allows customisation of the AI contact's profile.

```typescriptreact
export default function ProfileSettings({
  contactName,
  setContactName,
  contactImage,
  setContactImage,
  contactPersonality,
  setContactPersonality,
  isOnline,
  setIsOnline
}) {
  // Implementation
}
```

### Server Actions

The application uses Next.js Server Actions for AI integration:

#### Chat Action (`app/actions/chat.actions.ts`)

```typescriptreact
"use server"

import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export async function generateChatResponse(
  message: string,
  contactName: string,
  contactPersonality: string
) {
  // Create system prompt
  // Generate AI response
  // Return response text
}
```

### AI Integration

The application uses the Vercel AI SDK to integrate with Google Generative AI:

1. **Prompt Engineering:** The system prompt instructs the AI to respond like a friend with the specified personality.
2. **Response Generation:** Uses the `generateText` function from the AI SDK.
3. **Typing Simulation:** Calculates typing time based on response length for realism.

### Styling

The application uses Tailwind CSS with shadcn/ui components:

- **Chat Bubbles:** Different colours for user (blue) and AI (white) messages
- **Typing Indicator:** Animated dots with the contact's name
- **Header:** Contact information with avatar and online status
- **Input Area:** Message input with attachment and send buttons

## Usage Guide

### Basic Usage

1. **Start Chatting:**

1. Type a message in the input field
1. Press Enter or click the send button
1. The AI will respond after a realistic typing delay

1. **Customise Your Contact:**

1. Click the settings icon (⚙️) in the top right corner
1. Modify the contact's name, profile picture, and personality
1. Toggle online/offline status

### Personality Customisation

The personality field accepts free-form text describing how your contact should respond. Examples:

- "friendly, casual, and sometimes witty"
- "professional and formal with occasional humor"
- "sarcastic and always making jokes"
- "caring and supportive, asks a lot of questions"

The AI will adapt its responses based on this description.

### Tips for Realistic Conversations

- Set a personality that matches your needs
- Use casual language as you would with a real friend
- The AI will try to match your tone and style
- For best results, keep messages conversational

## Customisation

### UI Customisation

The application uses Tailwind CSS, making it easy to customise:

1. **Colours:** Modify the colour scheme in `tailwind.config.js`
2. **Components:** Customise shadcn/ui components in the `components/ui` directory
3. **Layout:** Adjust the layout in `app/page.tsx`

### AI Behaviour Customisation

1. **System Prompt:** Modify the system prompt in `app/actions/chat.actions.ts`
2. **Initial Messages:** Change the starter messages in `app/page.tsx`
3. **Typing Speed:** Adjust the typing speed calculation in the `handleSubmit` function

## Future Enhancements

### Voice Notes Feature

Planned implementation for sending and receiving voice messages:

- **Recording Interface:** Add a recording button that activates when held
- **Waveform Visualisation:** Show audio waveform during recording
- **Playback Controls:** Add play/pause buttons for received voice notes
- **Text-to-Speech:** Convert AI responses to audio using a TTS service

**Technical Implementation:**

- Use Web Audio API for recording
- Integrate with a TTS service (e.g., Google Cloud TTS)
- Store audio files temporarily in browser storage

### Voice Call Simulation

Future enhancement to simulate voice calls:

- **Call Triggers:** Type specific commands (e.g., "/call") to initiate calls
- **Call Interface:** Create a realistic call screen overlay
- **Audio Playback:** Play pre-recorded audio during "calls"
- **Call History:** Add call entries to the chat history

**Technical Implementation:**

- Create a modal overlay for the call interface
- Use the Audio API for playback
- Design call accept/decline UI

### Additional Planned Features

- **Multiple Contacts:** Switch between different AI personas
- **Message Scheduling:** Set times for automatic AI responses
- **Media Sharing:** Simulate sharing and receiving images
- **Group Chat:** Create simulated group conversations
- **Custom Themes:** Add theme options to match popular messaging apps
- **Offline Mode:** Enable offline functionality with cached responses
- **Export Conversations:** Save or share conversation history

## Troubleshooting

### Common Issues

#### AI Not Responding

**Possible causes:**

- Invalid or missing API key
- Network connectivity issues
- Rate limiting from Google AI

**Solutions:**

- Check your `.env.local` file for the correct API key
- Verify network connectivity
- Check Google AI dashboard for rate limit information

#### Slow Response Times

**Possible causes:**

- Slow internet connection
- Complex prompts requiring more processing
- Server load

**Solutions:**

- Simplify the personality description
- Check your internet connection
- Reduce the length of the conversation history

#### Styling Issues

**Possible causes:**

- CSS conflicts
- Tailwind not generating classes
- Responsive design breakpoints

**Solutions:**

- Check browser console for CSS errors
- Run `npm run build` to regenerate Tailwind classes
- Test on different devices and screen sizes

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/jediahjireh/faux-chat/issues) page
2. Create a new issue with detailed information about the problem
3. Include steps to reproduce, expected behaviour, and actual behaviour

## Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork the repository**
2. **Create a feature branch:**

   ```zsh
   git checkout -b feature/new-feature
   ```

3. **Make your changes**
4. **Commit your changes:**

   ```zsh
   git commit -m 'Add a new feature'
   ```

5. **Push to the branch:**

   ```zsh
   git push origin feature/new-feature
   ```

6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation for changes
- Ensure all tests pass before submitting a PR

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Google Generative AI](https://ai.google.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Inspired by the common social behaviour of using phones to avoid awkward situations

---
