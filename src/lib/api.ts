import { Experience, Publication, Project } from '@/types/api';

const EXPERIENCE_DATA: Experience[] = [
    {
        title: "Software Research Engineer (Federated Learning)",
        company: "California State University, Long Beach",
        location: "Long Beach, CA",
        date: "Jan. 2026 – Present",
        description: [
            "Architecting SwiftBot, a distributed microservices platform that orchestrates robot tasks using Docker containers and LLM agents.",
            "Reduced system cold-start latency by 95% (to 120ms) by implementing a warm-container orchestration strategy and optimizing network overhead.",
            "Developing a custom DHT (Distributed Hash Table) overlay in Python to handle service discovery and fault tolerance across distributed nodes."
        ]
    },
    {
        title: "Machine Learning Engineer Intern",
        company: "National Park Service",
        location: "Remote",
        date: "Dec. 2024 – May 2025",
        description: [
            "Engineered a scalable AWS ETL pipeline (S3, Lambda) to ingest and process a 90 GB dataset, automating the transformation of raw aerial imagery for analysis.",
            "Deployed an EfficientDet object detection model into production using SageMaker, enabling real-time environmental monitoring on resource-constrained edge devices."
        ]
    },
    {
        title: "Undergraduate Research Engineer",
        company: "California State University, Long Beach",
        location: "Long Beach, CA",
        date: "May 2024 – May 2025",
        description: [
            "Built a lightweight Federated Learning platform (HumanSys '25) optimized for IoT devices, focusing on memory efficiency and network bandwidth reduction.",
            "Designed algorithms for workload prediction using SQL to aggregate and analyze historical performance data, optimizing resource allocation for edge architectures."
        ]
    }
];

const PUBLICATIONS_DATA: Publication[] = [
    {
        title: "A Lightweight Federated Learning Platform for IoT Devices",
        conference: "HumanSys '25",
        date: "2025",
        description: "Focused on memory efficiency and network bandwidth reduction for edge architectures."
    }
];

const PROJECTS_DATA: Project[] = [
    {
        title: "Lingo AI: Full Stack Language Application",
        stack: "TypeScript, Next.js, Firebase, OpenAI",
        date: "June 2024 – Aug. 2024",
        description: [
            "Collaborated in an engineering team to build a responsive web application using React/Next.js and Tailwind CSS for real-time language tutoring.",
            "Implemented Firebase for real-time database management and authentication, securing user session history and chat logs.",
            "Utilized Git for version control and code reviews, ensuring smooth integration of frontend components with backend API services."
        ]
    },
    {
        title: "NestDetector: Cloud-Native Vision System",
        stack: "Python, AWS, PyTorch",
        date: "Jan. 2025 – May 2025",
        description: [
            "Designed a cloud-native vision system capable of processing large-scale datasets, leveraging AWS Lambda for serverless event triggers.",
            "Implemented automated data validation and preprocessing scripts to ensure high-quality input for model training pipelines."
        ]
    }
];

export async function getExperience(): Promise<Experience[]> {
  return EXPERIENCE_DATA;
}

export async function getPublications(): Promise<Publication[]> {
  return PUBLICATIONS_DATA;
}

export async function getProjects(): Promise<Project[]> {
  return PROJECTS_DATA;
}
