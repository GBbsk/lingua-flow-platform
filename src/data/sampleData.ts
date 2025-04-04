
import { Module } from "../types";

export const sampleModules: Module[] = [
  {
    id: "module-1",
    title: "Introdução ao Inglês",
    description: "Primeiros passos para aprender inglês",
    thumbnail: "/placeholder.svg",
    lessons: [
      {
        id: "lesson-1-1",
        title: "Cumprimentos em Inglês",
        description: "Aprenda a cumprimentar pessoas em inglês",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        files: [
          {
            id: "file-1-1-1",
            name: "Cumprimentos - PDF",
            url: "/files/greetings.pdf",
            type: "pdf"
          },
          {
            id: "file-1-1-2",
            name: "Vocabulário Básico",
            url: "/files/basic-vocabulary.docx",
            type: "docx"
          }
        ],
        audios: [
          {
            id: "audio-1-1-1",
            title: "Pronúncia de Cumprimentos",
            url: "/audios/greetings.mp3",
            transcript: "Hello! Good morning! How are you? I'm fine, thank you."
          }
        ]
      },
      {
        id: "lesson-1-2",
        title: "Números e Contagem",
        description: "Aprenda a contar em inglês",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        files: [
          {
            id: "file-1-2-1",
            name: "Números de 1-100",
            url: "/files/numbers.pdf",
            type: "pdf"
          }
        ],
        audios: [
          {
            id: "audio-1-2-1",
            title: "Pronúncia dos Números",
            url: "/audios/numbers.mp3",
            transcript: "One, two, three, four, five, six, seven, eight, nine, ten."
          }
        ]
      }
    ]
  },
  {
    id: "module-2",
    title: "Conversação Básica",
    description: "Aprenda a manter conversas simples em inglês",
    thumbnail: "/placeholder.svg",
    lessons: [
      {
        id: "lesson-2-1",
        title: "No Restaurante",
        description: "Como pedir comida em inglês",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        files: [
          {
            id: "file-2-1-1",
            name: "Vocabulário de Restaurante",
            url: "/files/restaurant.pdf",
            type: "pdf"
          }
        ],
        audios: [
          {
            id: "audio-2-1-1",
            title: "Diálogo no Restaurante",
            url: "/audios/restaurant.mp3",
            transcript: "Waiter: Hello, can I take your order? Customer: Yes, I would like a salad, please."
          }
        ]
      }
    ]
  }
];
