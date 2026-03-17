import { useState, useEffect, useRef } from 'react';
import { useMode } from '../contexts/ModeContext';
import './SafeMode.css';

interface CommandOutput {
  command: string;
  output: string[];
  visibleLines: number; // For animation
}

const SafeMode = () => {
  const { logout } = useMode();
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show boot messages with animation
    const bootMessages = [
      'Portfolio OS [Version 1.0]',
      '(c) 2024 Shubham Singhal. All rights reserved.',
      '',
      'Initializing Safe Mode...',
      'Loading minimal drivers...',
      'Safe Mode boot complete.',
      '',
      'Type "help" for available commands.',
      ''
    ];

    animateOutput('', bootMessages);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Cursor blink effect
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const animateOutput = (command: string, output: string[]) => {
    setIsProcessing(true);

    // Add entry with 0 visible lines
    const newEntry: CommandOutput = {
      command,
      output,
      visibleLines: 0
    };

    setHistory((prev) => [...prev, newEntry]);

    // Animate lines appearing one by one
    let currentLine = 0;
    const animateNextLine = () => {
      if (currentLine < output.length) {
        setHistory((prev) => {
          const updated = [...prev];
          const lastEntry = updated[updated.length - 1];
          if (lastEntry) {
            lastEntry.visibleLines = currentLine + 1;
          }
          return updated;
        });

        currentLine++;
        // Random delay between 20-80ms for realistic terminal feel
        const delay = Math.random() * 60 + 20;
        setTimeout(animateNextLine, delay);
      } else {
        setIsProcessing(false);
        // Auto-focus input after animation completes
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      }
    };

    // Start animation after brief delay
    setTimeout(animateNextLine, 50);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: string[] = [];

    switch (trimmedCmd) {
      case 'help':
        output = [
          'Available commands:',
          '  help      - Show this help message',
          '  about     - Information about Shubham Singhal',
          '  resume    - View resume summary',
          '  skills    - Technical skills overview',
          '  experience - Work experience summary',
          '  projects  - Featured projects',
          '  contact   - Contact information',
          '  exit      - Return to login screen',
          '  cls       - Clear screen',
          ''
        ];
        break;

      case 'about':
        output = [
          'SHUBHAM SINGHAL',
          'Robotics Engineer',
          '',
          'Specializing in perception systems and sensor integration for',
          'autonomous robots. Expert in C++ optimization for edge devices',
          '(Jetson, RealSense, LiDAR).',
          '',
          'Location: Tokyo, Japan',
          'Email: ssinghalatwork@gmail.com',
          ''
        ];
        break;

      case 'resume':
        output = [
          'RESUME SUMMARY',
          '',
          'Education:',
          '  B.Tech in Mechanical Engineering',
          '  Indian Institute of Technology (ISM), Dhanbad',
          '  Dec 2020 - May 2024',
          '',
          'Current Position:',
          '  Robotics Engineer at Ugo, inc',
          '  Tokyo, Japan | Oct 2024 - Present',
          '',
          'Type "skills" or "experience" for more details.',
          ''
        ];
        break;

      case 'skills':
        output = [
          'TECHNICAL SKILLS',
          '',
          'Languages:',
          '  Modern C++, Python, C#, SQL',
          '',
          'Robotics & Sensing:',
          '  livox_lidar_api, librealsense2, Point Cloud Processing,',
          '  LiDAR-Camera Calibration, ROS/ROS2, Gazebo',
          '',
          'Computer Vision & ML:',
          '  OpenCV, PyTorch, TensorRT, YOLOv8, Image Segmentation',
          '',
          'Tools & Infrastructure:',
          '  Linux (Ubuntu), Docker, Git, NATS Messaging, SolidWorks',
          ''
        ];
        break;

      case 'experience':
        output = [
          'WORK EXPERIENCE',
          '',
          '1. Ugo, inc - Robotics Engineer (Oct 2024 - Present)',
          '   - Refactored Intel RealSense D435 control pipeline in C++',
          '   - Developed marker-free meter reading system',
          '   - Designed custom Livox 3D LiDAR noise filtering',
          '',
          '2. Ugo, inc - Robotics Engineering Intern (May 2023 - July 2023)',
          '   - Optimized YOLOv5/v8 models for Jetson Nano',
          '   - Deployed autonomous navigation stack in 28 days',
          '   - Built .NET C# server with NATS messaging',
          ''
        ];
        break;

      case 'projects':
        output = [
          'FEATURED PROJECTS',
          '',
          '1. Automated Wall Alignment Ratio (WAR) System',
          '   ML Engineer & System Architect | June 2024 - Sept 2024',
          '   - Built production ML pipeline for construction company',
          '   - Applied transfer learning for floor plan analysis',
          '   - Designed adaptive fine-tuning system',
          '',
          '2. Amazon ML Summer School (2022)',
          '   - Intensive program covering Deep Learning and Sequential Models',
          '',
          '3. Technical Mentor, BeingArtifex IIT(ISM)',
          '   - Mentored 1000+ students in Python, C++, Arduino, IoT',
          ''
        ];
        break;

      case 'contact':
        output = [
          'CONTACT INFORMATION',
          '',
          'Email:    ssinghalatwork@gmail.com',
          'Phone:    +81-90-5362-1634',
          'Location: Tokyo, Japan',
          '',
          'Links:',
          '  Website:  https://s-singhal.com',
          '  LinkedIn: linkedin.com/in/sciencestoked',
          '  GitHub:   github.com/sciencestoked',
          ''
        ];
        break;

      case 'exit':
        logout();
        return;

      case 'cls':
      case 'clear':
        setHistory([]);
        return;

      case '':
        // Empty command, just add newline
        break;

      default:
        output = [`'${cmd}' is not recognized as an internal or external command.`, 'Type "help" for available commands.', ''];
    }

    animateOutput(cmd, output);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="safe-mode" onClick={handleTerminalClick}>
      <div className="safe-mode-terminal" ref={terminalRef}>
        {history.map((entry, idx) => (
          <div key={idx} className="terminal-entry">
            {entry.command && (
              <div className="terminal-prompt">
                C:\Portfolio&gt; <span className="terminal-command">{entry.command}</span>
              </div>
            )}
            {entry.output.slice(0, entry.visibleLines).map((line, lineIdx) => (
              <div key={lineIdx} className="terminal-output">
                {line}
              </div>
            ))}
          </div>
        ))}

        {!isProcessing && (
          <div className="terminal-input-line">
            <span className="terminal-prompt-symbol">C:\Portfolio&gt; </span>
            <span className="terminal-input-wrapper">
              <span className="terminal-input-text">{currentCommand}</span>
              <span className={`terminal-cursor ${showCursor ? 'visible' : 'hidden'}`}>_</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="terminal-input-hidden"
              spellCheck={false}
              autoComplete="off"
              disabled={isProcessing}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SafeMode;
