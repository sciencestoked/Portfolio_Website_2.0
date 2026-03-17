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

export interface ProjectItem {
  id: string;
  title: string;
  icon: string;
  thumbnail: string;
  images: string[];
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  overview?: string;
  detailedAchievements?: Array<{
    title: string;
    description: string;
  }>;
  challenges?: string;
  impact?: string;
  links?: {
    github?: string;
    demo?: string;
    article?: string;
  };
}

export const projects: ProjectItem[] = [
  {
    id: 'ugo-fulltime',
    title: 'Ugo Robotics - Full-Time',
    icon: '🤖',
    thumbnail: '/recruiter/images/ugo/desk-setup.jpeg',
    images: [
      '/recruiter/images/ugo/desk-setup.jpeg',
      '/recruiter/images/ugo/cute-ugo-mini-robot.jpeg',
    ],
    period: 'Oct 2024 – Present',
    description: 'Refactored Intel RealSense D435 pipeline achieving 20% performance improvement. Developed marker-free meter reading system with 100% accuracy boost. Designed custom Livox 3D LiDAR noise filtering. Deployed to hundreds of production robots.',
    highlights: [
      '20% CPU/memory reduction in RealSense pipeline',
      '100% accuracy improvement in meter reading',
      'Custom Livox LiDAR filtering algorithm',
      'Deployed to hundreds of production robots'
    ],
    technologies: ['Modern C++', 'Python', 'Intel RealSense D435', 'Livox 3D LiDAR', 'librealsense2', 'PCL', 'OpenCV', 'Linux', 'Git', 'Docker'],
    overview: 'Full-time Robotics Engineer position focusing on perception systems and sensor integration for autonomous delivery robots deployed across hundreds of production units.',
    detailedAchievements: [
      {
        title: 'Intel RealSense D435 Pipeline Refactor',
        description: 'Refactored the entire C++ control pipeline, reducing CPU and memory usage by 20% while resolving critical deadlock conditions in IR emitter state management and terminal I/O operations.'
      },
      {
        title: 'Hardware-Accelerated Point Cloud Processing',
        description: 'Migrated depth-to-point-cloud conversion from pixel color parsing to hardware-accelerated RealSense functions, significantly improving point cloud density, accuracy, and latency.'
      },
      {
        title: 'Marker-Free Meter Reading System',
        description: 'Developed computer vision system using template matching and spatial arrangement algorithms, achieving 100% accuracy improvement over third-party AI solution and eliminating customer QR code placement requirements.'
      },
      {
        title: 'Livox 3D LiDAR Noise Filtering',
        description: 'Designed custom noise filtering using geometry-based Region of Interest (ROI) calculations, successfully removing body-reflection artifacts and enabling deployment on space-constrained robot platforms.'
      },
      {
        title: 'Production Support & Collaboration',
        description: 'Collaborated with global Customer Success and Software teams to debug hardware issues across hundreds of deployed robots, managing complex Git workflows for frequent release cycles.'
      }
    ],
    impact: 'Solutions deployed to hundreds of production robots, directly improving operational efficiency and reliability.'
  },
  {
    id: 'ugo-intern',
    title: 'Robotic Kart Navigation',
    icon: '🛒',
    thumbnail: '/recruiter/images/ugo/kart-spinning-lol.gif',
    images: [
      '/recruiter/images/ugo/kart-spinning-lol.gif',
      '/recruiter/images/ugo/map-i-made-and-am-proud-of.jpeg',
      '/recruiter/images/ugo/cool-self-potrait-front-of-tokyo-tower.jpeg',
    ],
    period: 'May 2023 – July 2023',
    description: 'Developed autonomous navigation system for robotic kart in just 20 days. Built virtual robot model with LiDAR and encoder integration. Created .NET C# server with NATS messaging for navigation data using HectorSLAM and MCL.',
    highlights: [
      'Autonomous navigation in 20 days',
      'HectorSLAM mapping implementation',
      'Monte Carlo Localization (MCL)',
      'NATS messaging architecture'
    ],
    technologies: ['ROS', 'C#', '.NET', 'NATS', 'HectorSLAM', 'MCL', 'LiDAR', 'Gazebo'],
    overview: 'Offline internship at Ugo Inc, working on developing and deploying advanced robotic solutions, focusing on autonomous navigation using lidar mapping. The project was divided into two main phases: mapping and autonomous navigation.',
    detailedAchievements: [
      {
        title: 'Mapping Phase - SLAM Implementation',
        description: 'Implemented SLAM algorithm for environment mapping with joystick control. Developed complete mapping pipeline including joystick control facilitation, odometry calculation from twist messages, data publisher receiving server data and publishing as twist messages, robot URDF description, lidar sensor launch configuration, and velocity to array conversion for robot movement.'
      },
      {
        title: 'Navigation Phase - Autonomous Navigation Stack',
        description: 'Developed autonomous navigation system consisting of odometry calculation, data publisher for twist messages, robot URDF description, velocity to array conversion, and complete navigation stack with costmap configurations, launch files for all navigation nodes, saved maps folder, and dynamic transformation publishing from odometry frame to base footprint.'
      },
      {
        title: 'Autonomous Navigation Implementation',
        description: 'Successfully implemented full autonomous navigation workflow: launching navigation stack, visualizing in Rviz, setting initial 2D pose to align laser scan with map boundary, setting 2D navigation goals, and achieving autonomous navigation to specified goals.'
      }
    ],
    challenges: 'Sensor Calibration: Ensuring accurate sensor data was crucial. Resolved by performing extensive calibration tests and adjusting parameters accordingly. Odometry Drift: Odometry data tended to drift over time, affecting navigation accuracy. Mitigated by implementing sensor fusion techniques to combine data from multiple sensors. Obstacle Avoidance: The robot had to navigate around obstacles in real-time. Addressed by fine-tuning navigation stack parameters and integrating real-time obstacle detection algorithms.',
    impact: 'Successfully developed and deployed autonomous navigation system using lidar mapping, enabling the robot to navigate autonomously in mapped environments.'
  },
  {
    id: 'ugo-online',
    title: 'Elevator Button Detection',
    icon: '🔘',
    thumbnail: '/recruiter/images/ugo-online/elevator-button-inference.jpg',
    images: [
      '/recruiter/images/ugo-online/elevator-button-inference.jpg',
      '/recruiter/images/ugo-online/jetson-nano-setup.png',
      '/recruiter/images/ugo-online/weights-and-biases-comparision-graph.png',
      '/recruiter/images/ugo-online/RoboFlow-Dashboard.png',
    ],
    period: 'May 2023 – July 2023',
    description: 'Improved elevator button detection accuracy by 3X using advanced data augmentation. Optimized YOLO models for Jetson Nano with TensorRT and ONNX conversion. Implemented ROS 2 Humble task dispatcher with RMF Core.',
    highlights: [
      '3X accuracy improvement with data augmentation',
      'YOLOv5/v8 optimization for edge devices',
      'TensorRT and ONNX conversion',
      'ROS 2 + RMF Core integration'
    ],
    technologies: ['Python', 'PyTorch', 'YOLOv5', 'YOLOv8', 'TensorRT', 'ONNX', 'Jetson Nano', 'ROS 2 Humble', 'Gazebo Fortress', 'RoboFlow'],
    overview: 'Online internship at Ugo Inc focused on optimizing the Elevator Button Detection Problem. This project involved improving the performance of an existing machine learning model and exploring optimization techniques for deployment on edge devices.',
    detailedAchievements: [
      {
        title: 'Performance Enhancement - Data Augmentation',
        description: 'Implemented data augmentation techniques such as rotation, scaling, and brightness adjustment using Roboflow to create a more robust training dataset. This resulted in a 3X performance boost.'
      },
      {
        title: 'Model Optimization for Edge Deployment',
        description: 'Converted YOLO models to the ONNX format and explored TensorRT SDK for optimization on the Jetson Nano, significantly improving inference speed and efficiency.'
      },
      {
        title: 'Experiment Management',
        description: 'Used Weights & Biases for tracking progress and results. Logged augmentation techniques and their effects on model performance, tracked various model versions and their respective performance metrics.'
      },
      {
        title: 'RMF Core and Task Dispatcher Implementation',
        description: 'Implemented RMF Core and task dispatcher mechanisms for collective robot control using ROS 2 Humble and Gazebo Fortress/Ignition. Integrated RMF Core to manage robot fleets and coordinate their tasks efficiently. Developed a task dispatcher to assign tasks dynamically to the robots based on their status and location.'
      }
    ],
    challenges: 'Data Augmentation: Ensuring the augmented data was realistic and beneficial for training. Addressed by carefully selecting and testing augmentation techniques. Model Conversion: Converting the YOLO model to ONNX and ensuring compatibility with TensorRT. Required extensive testing and parameter tuning. RMF Integration: Integrating RMF Core with the existing system. Resolved by collaborating with the RMF community and following best practices.',
    impact: 'Successfully optimized elevator button detection model with 3X performance improvement and deployed on Jetson Nano edge device with TensorRT optimization.'
  },
  {
    id: 'war-system',
    title: 'Wall Alignment Ratio System',
    icon: '📐',
    thumbnail: '/recruiter/images/war/placeholder-war-thumb.jpg',
    images: [
      '/recruiter/images/war/placeholder-war-banner.jpg',
    ],
    period: 'June 2024 – Sept 2024',
    description: 'Built production ML pipeline for automated wall detection from construction floor plans. Applied transfer learning achieving validation loss below 0.19. Designed adaptive fine-tuning system for continuous accuracy improvement.',
    highlights: [
      'Production ML pipeline for construction',
      'Transfer learning with loss < 0.19',
      'Adaptive fine-tuning system',
      'Automated floor plan analysis'
    ],
    technologies: ['Python', 'PyTorch', 'Transfer Learning', 'Computer Vision', 'ML Pipeline', 'TensorBoard'],
    overview: 'Built production ML pipeline to automate wall detection and alignment calculations from floor plan PDFs and images, successfully replacing manual CAD analysis workflow for construction company.',
    detailedAchievements: [
      {
        title: 'Transfer Learning Strategy',
        description: 'Applied two-stage approach: trained foundation model on public datasets, then fine-tuned on client-specific floor plan styles. Achieved validation loss below 0.19 with high accuracy on production data.'
      },
      {
        title: 'Adaptive Fine-Tuning System',
        description: 'Designed on-the-fly model retraining system that learns from user corrections, enabling continuous accuracy improvement through weighted feedback integration.'
      },
      {
        title: 'Optimized Training Pipeline',
        description: 'Implemented patch-based processing to preserve architectural detail without downsampling. Applied advanced augmentation techniques (ElasticTransform, CoarseDropout) to improve model robustness across varied floor plan styles.'
      }
    ],
    impact: 'Successfully deployed to replace manual CAD analysis, reducing processing time and improving consistency in wall alignment calculations for construction planning.'
  },
  {
    id: 'amazon-ml',
    title: 'Amazon ML Summer School',
    icon: '📚',
    thumbnail: '/recruiter/images/ml-school/ml-school-thumb.jpg',
    images: [
      '/recruiter/images/ml-school/ml-school-banner.jpg',
      '/recruiter/images/ml-school/ml-school-intro.jpeg',
    ],
    period: 'June 2022 – August 2022',
    description: 'Intensive ML program covering Supervised Learning, Deep Neural Networks, Dimensionality Reduction, and Sequential Models. Collaborated with Amazon Scientists on cutting-edge ML innovations and real-world case studies.',
    highlights: [
      'Supervised & Unsupervised Learning',
      'Deep Neural Networks',
      'Probabilistic Graphical Models',
      'Collaboration with Amazon Scientists'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Deep Learning', 'ML Theory'],
    overview: 'Comprehensive training program in Machine Learning and Deep Learning at Amazon ML School. The program provided training in Supervised Learning, Deep Neural Networks, Dimensionality Reduction, and other advanced ML techniques. Collaborated with Amazon Scientists to apply concepts to real-world industry problems.',
    detailedAchievements: [
      {
        title: 'Comprehensive ML Curriculum',
        description: 'Completed eight key modules covering: Supervised Learning, Deep Neural Networks, Dimensionality Reduction, Unsupervised Learning, Probabilistic Graphical Models, Sequential Learning, Causal Inference, and Reinforcement Learning.'
      },
      {
        title: 'Real-World Application',
        description: 'Applied machine learning concepts to practical challenges, enhancing skills in model evaluation and feature engineering. Worked on real-world industry problems in collaboration with Amazon Scientists.'
      },
      {
        title: 'Expert Mentorship',
        description: 'Gained in-depth knowledge from Amazon Scientists, interacted with experts on breakthrough innovations, and built a solid foundation for a career in ML.'
      }
    ],
    impact: 'The program was pivotal in shaping career as a data scientist, equipping with the skills to tackle complex ML problems and preparing for a career in ML with a solid foundation.'
  },
  {
    id: 'beingartifex',
    title: 'BeingArtifex - Technical Mentor',
    icon: '🎓',
    thumbnail: '/recruiter/images/bfx/bfx-robotics-workshop.jpeg',
    images: [
      '/recruiter/images/bfx/bfx-robotics-workshop.jpeg',
      '/recruiter/images/bfx/bfx-skillathon-banner.jpeg',
      '/recruiter/images/bfx/bfx-even-coordinator-insta-post.jpeg',
    ],
    period: 'March 2021 – December 2022',
    description: 'Led technical seminars on robotics and machine learning. Organized Skillathon event inspiring school students. Mentored 1000+ students in Python, C++, Arduino, IoT, Design, Public Speaking, and Management.',
    highlights: [
      'Mentored 1000+ students',
      'Led robotics & ML seminars',
      'Organized Skillathon event',
      'Topics: Python, C++, Arduino, IoT'
    ],
    technologies: ['Python', 'C++', 'Arduino', 'IoT', 'Robotics', 'Public Speaking', 'Event Management'],
    overview: 'Mentorship and leadership role at BeingArtifex, IIT(ISM) Dhanbad, a student-driven community dedicated to fostering technical and leadership skills. Mentored over 1000 students covering Python Programming, Arduino, IoT, C++ Programming, and various design and management skills.',
    detailedAchievements: [
      {
        title: 'Large-Scale Student Mentorship',
        description: 'Mentored over 1000 students, covering a wide range of topics including Python Programming, Arduino, IoT, C++ Programming, and various design and management skills.'
      },
      {
        title: 'Skillathon Event Coordination',
        description: 'Served as event coordinator for the second edition of Skillathon, a flagship initiative designed to introduce school students to technology. Ensured the event\'s success by overseeing its smooth execution.'
      },
      {
        title: 'Technical Talks and Seminars',
        description: 'Conducted numerous talks and seminars on robotics and machine learning, aimed at equipping students with the knowledge and skills to excel in these fields.'
      },
      {
        title: 'Teaching Programming and Design',
        description: 'Taught essential programming languages and tools, and provided insights into public speaking and graphic design, contributing significantly to the development of future technologists and leaders.'
      }
    ],
    impact: 'Successfully mentored over 1000 students and contributed to their technical and leadership development. BeingArtifex played a crucial role in honing leadership skills and deepening knowledge across multiple technical domains.'
  },
];
