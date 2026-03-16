// Portfolio data extracted from updated portfolio
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  highlights: string[];
  technologies?: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface HobbyItem {
  title: string;
  icon: string;
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'ugo-fulltime',
    company: 'Ugo, inc',
    role: 'Robotics Engineer',
    period: 'Oct 2024 – Present',
    location: 'Tokyo, Japan',
    description: [
      'Refactored Intel RealSense D435 pipeline, reducing CPU/memory by 20% and resolving deadlock conditions.',
      'Developed marker-free meter reading achieving 100% accuracy improvement over third-party AI.',
      'Designed Livox 3D LiDAR noise filtering using geometry-based ROI calculations.',
      'Deployed solutions to hundreds of production robots.',
    ],
    highlights: ['20% performance improvement', '100% accuracy boost', 'Hundreds of robots deployed'],
    technologies: ['Modern C++', 'Python', 'Intel RealSense D435', 'Livox 3D LiDAR', 'librealsense2', 'PCL', 'OpenCV', 'Linux', 'Git', 'Docker']
  },
  {
    id: 'ugo-intern',
    company: 'Ugo, Inc',
    role: 'Robotics Engineering Intern (Competitive Program)',
    period: 'May 2023 – July 2023',
    location: 'Tokyo, Japan & Remote',
    description: [
      'Developed automated navigation systems for a robotic kart in just 20 days.',
      'Built virtual robot model and nodes for LiDAR and encoder data.',
      'Created .NET C# server and NATS server for navigation data, using HectorSLAM for mapping and MCL for localization.',
    ],
    highlights: ['20 day delivery', 'HectorSLAM + MCL', 'Selected 1 of 6 from premier IITs'],
    technologies: ['ROS', 'C#', '.NET', 'NATS', 'HectorSLAM', 'MCL', 'LiDAR', 'Rviz']
  },
  {
    id: 'ugo-online',
    company: 'Ugo, Inc',
    role: 'Robotics & Machine Learning Internship',
    period: 'May 2023 – July 2023',
    location: 'Remote Portion',
    description: [
      'Improved elevator button detection accuracy by 3X with advanced data augmentation.',
      'Optimized YOLO models for Jetson Nano using TensorRT and ONNX conversion.',
      'Implemented RMF Core and task dispatcher mechanisms with ROS 2 Humble and Gazebo Fortress/Ignition.',
    ],
    highlights: ['3X accuracy improvement', 'TensorRT optimization', 'ROS 2 + Gazebo'],
    technologies: ['YOLO', 'TensorRT', 'ONNX', 'Jetson Nano', 'ROS 2 Humble', 'Gazebo Fortress', 'RMF Core', 'Roboflow', 'Weights & Biases']
  },
  {
    id: 'war-system',
    company: 'Contract Project',
    role: 'ML Engineer & System Architect',
    period: 'June 2024 – Sept 2024',
    location: 'Remote',
    description: [
      'Built production ML pipeline for automated wall detection from floor plans.',
      'Applied transfer learning, achieved validation loss below 0.19.',
      'Designed adaptive fine-tuning system for continuous accuracy improvement.',
    ],
    highlights: ['Production ML pipeline', '<0.19 validation loss', 'Adaptive fine-tuning'],
    technologies: ['PyTorch', 'Image Segmentation', 'Transfer Learning', 'PDF parsing', 'ElasticTransform', 'CoarseDropout']
  },
  {
    id: 'amazon-ml',
    company: 'Amazon ML School',
    role: 'Machine Learning Mentee',
    period: 'June 2022 – August 2022',
    location: 'Remote',
    description: [
      'Gained skills in Supervised Learning, Deep Neural Networks, Dimensionality Reduction, and more.',
      'Applied knowledge to real-world cases and collaborated with Amazon Scientists on cutting-edge ML innovations.',
      'Completed 8 modules: Supervised Learning, Deep Neural Networks, Dimensionality Reduction, Unsupervised Learning, Probabilistic Graphical Models, Sequential Learning, Causal Inference, Reinforcement Learning.',
    ],
    highlights: ['Amazon Scientists mentorship', 'Real-world ML applications', '8 comprehensive modules'],
    technologies: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Reinforcement Learning', 'Causal Inference']
  },
  {
    id: 'beingartifex',
    company: 'BeingArtifex, IIT(ISM) Dhanbad',
    role: 'Seminars Lead & Event Coordinator',
    period: 'March 2021 – December 2022',
    location: 'Dhanbad, India',
    description: [
      'Led sessions on robotics and machine learning.',
      'Organized Skillathon to inspire school students.',
      'Educated 1000+ students in Python, Arduino, IoT, C++, Design, Public Speaking, and Management.',
    ],
    highlights: ['1000+ students educated', 'Robotics & ML seminars', 'Event coordination'],
    technologies: ['Python', 'Arduino', 'IoT', 'C++', 'Teaching', 'Public Speaking']
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: '💻',
    skills: ['Python', 'C++', 'C#', 'SQL', 'MATLAB']
  },
  {
    title: 'Machine Learning',
    icon: '🤖',
    skills: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-Learn', 'TensorRT']
  },
  {
    title: 'Robotics',
    icon: '🦾',
    skills: ['ROS', 'ROS 2', 'Arduino', 'Solidworks', 'Blender', 'RealSense', 'LiDAR', 'Point Cloud Library']
  },
  {
    title: 'Libraries & Tools',
    icon: '🛠️',
    skills: ['OpenCV', 'NumPy', 'Pandas', 'Git', 'GitHub', 'Docker', 'Linux', 'NATS Messaging']
  },
  {
    title: 'Web Development',
    icon: '🌐',
    skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'NodeJS']
  },
];

export const hobbies: HobbyItem[] = [
  {
    title: 'Photography',
    icon: '📷',
    description: 'Transforming everyday moments into visual art through the lens, capturing the essence of life in images.'
  },
  {
    title: 'Language and Culture',
    icon: '🗾',
    description: 'Exploring Japanese language and culture, enhancing my communication skills in my current role in Tokyo.'
  },
  {
    title: 'Exploring Technology',
    icon: '💡',
    description: 'Engaging with the latest tech, continuously learning and staying at the forefront of technological advancements.'
  },
];

export const education = {
  institution: 'Indian Institute of Technology (ISM), Dhanbad',
  degree: 'B.Tech - Mechanical Engineering',
  graduated: 'May 2024',
};

export const contact = {
  name: 'Shubham Singhal',
  title: 'Robotics Engineer & ML Enthusiast',
  location: 'Tokyo, Japan',
  phone: '+81-90-5362-1634',
  email: 'ssinghalatwork@gmail.com',
  social: {
    twitter: 'https://x.com/sciencestoked',
    github: 'https://github.com/sciencestoked',
    linkedin: 'https://linkedin.com/in/sciencestoked',
  },
};
