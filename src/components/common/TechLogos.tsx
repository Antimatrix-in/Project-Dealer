import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

// 1. TensorFlow Official Logo
export function TensorFlowLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7.2V11.8L12 6.6L21 11.8V7.2L12 2Z" fill="#FF6F00" />
      <path d="M3 12.8L12 7.6V22L3 16.8V12.8Z" fill="#FFA800" />
      <path d="M21 12.8L12 7.6V22L21 16.8V12.8Z" fill="#E65100" />
      <path d="M12 7.6L7.5 10.2V14.4L12 11.8V7.6Z" fill="#FFFFFF" fillOpacity="0.3" />
    </svg>
  );
}

// 2. PyTorch Official Logo
export function PyTorchLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M13.5 2.5C13.5 2.5 13 4 11.5 5.5C10 7 7.5 9 7.5 12.5C7.5 16 10.2 19 13.5 19C17 19 19.5 16 19.5 12C19.5 7.5 13.5 2.5 13.5 2.5ZM13.2 16.8C11.5 16.8 10.2 15.2 10.2 13.5C10.2 11.5 11.8 10 12.8 9C13 10.5 14 11.5 14.8 12.2C15.5 13 16 14 16 15C16 16.2 14.8 16.8 13.2 16.8Z"
        fill="#EE4C2C"
      />
      <circle cx="17.5" cy="4.5" r="1.8" fill="#EE4C2C" />
    </svg>
  );
}

// 3. OpenAI Official Logo
export function OpenAILogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M20.5 10.2C20.2 8.4 19 7 17.5 6.3C17.2 4.6 15.8 3.3 14.1 3.1C13.7 3.1 13.3 3.1 12.9 3.2C12 2.4 10.7 2 9.5 2.2C7.7 2.5 6.3 3.8 5.7 5.5C4.2 6.1 3.1 7.4 3 9C2.9 9.5 3 10 3.2 10.5C2.5 11.5 2.2 12.8 2.5 14C2.8 15.8 4 17.2 5.5 17.9C5.8 19.6 7.2 20.9 8.9 21.1C9.3 21.1 9.7 21.1 10.1 21C11 21.8 12.3 22.2 13.5 22C15.3 21.7 16.7 20.4 17.3 18.7C18.8 18.1 19.9 16.8 20 15.2C20.1 14.7 20 14.2 19.8 13.7C20.5 12.7 20.8 11.4 20.5 10.2ZM12 14.5C10.6 14.5 9.5 13.4 9.5 12C9.5 10.6 10.6 9.5 12 9.5C13.4 9.5 14.5 10.6 14.5 12C14.5 13.4 13.4 14.5 12 14.5Z"
        fill="#10A37F"
      />
    </svg>
  );
}

// 4. Pandas Official Logo
export function PandasLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="3.5" height="10" rx="1.5" fill="#150458" />
      <rect x="8" y="4" width="3.5" height="16" rx="1.5" fill="#FFD43B" />
      <rect x="13" y="7" width="3.5" height="13" rx="1.5" fill="#E70488" />
      <rect x="18" y="11" width="3.5" height="9" rx="1.5" fill="#00A3E0" />
    </svg>
  );
}

// 5. Scikit-Learn Official Logo
export function ScikitLearnLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8 2 5 5 5 9C5 11.5 6.5 13.5 8.5 14.8L6 21L12 18L18 21L15.5 14.8C17.5 13.5 19 11.5 19 9C19 5 16 2 12 2Z" fill="#F89939" fillOpacity="0.2" />
      <circle cx="9" cy="10" r="5" fill="#3499CD" />
      <circle cx="15" cy="10" r="5" fill="#F89939" fillOpacity="0.85" />
      <circle cx="12" cy="15" r="4" fill="#1E40AF" fillOpacity="0.75" />
    </svg>
  );
}

// 6. XGBoost Official Logo
export function XGBoostLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4L11 12L4 20H7L12.5 13.7L18 20H21L14 12L21 4H18L12.5 10.3L7 4H4Z" fill="#22C55E" />
      <circle cx="4" cy="4" r="2" fill="#10B981" />
      <circle cx="21" cy="4" r="2" fill="#10B981" />
      <circle cx="4" cy="20" r="2" fill="#10B981" />
      <circle cx="21" cy="20" r="2" fill="#10B981" />
    </svg>
  );
}

// 7. NumPy Official Logo
export function NumPyLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#4D77CF" strokeWidth="1.5" fill="#013243" fillOpacity="0.3" />
      <path d="M7 8V16L12 13V5L7 8Z" fill="#4D77CF" />
      <path d="M12 13L17 16V8L12 5V13Z" fill="#8CAAE6" />
    </svg>
  );
}

// 8. YOLO Official Logo
export function YoloLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#E11D48" />
      <circle cx="12" cy="12" r="5" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
      <text x="12" y="15.5" fill="#FFFFFF" fontSize="6" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
        YOLO
      </text>
    </svg>
  );
}

// 9. OpenCV Official Logo
export function OpenCVLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Red Circle Top */}
      <circle cx="12" cy="7" r="4" stroke="#EF4444" strokeWidth="2.2" strokeDasharray="18 6" />
      {/* Green Circle Bottom-Right */}
      <circle cx="16.5" cy="16" r="4" stroke="#10B981" strokeWidth="2.2" strokeDasharray="18 6" />
      {/* Blue Circle Bottom-Left */}
      <circle cx="7.5" cy="16" r="4" stroke="#3B82F6" strokeWidth="2.2" strokeDasharray="18 6" />
    </svg>
  );
}

// 10. Python Official Logo
export function PythonLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M11.8 2C6.9 2 7.2 4.1 7.2 4.1L7.2 6.3H12V7H5.2C5.2 7 2 6.6 2 11.5C2 16.4 4.8 16.1 4.8 16.1H6.4V13.9C6.4 11.4 8.5 11.4 8.5 11.4H13.3C13.3 11.4 15.3 11.5 15.3 9.5V4.3C15.3 4.3 15.7 2 11.8 2ZM9.7 3.5C10.2 3.5 10.6 3.9 10.6 4.4C10.6 4.9 10.2 5.3 9.7 5.3C9.2 5.3 8.8 4.9 8.8 4.4C8.8 3.9 9.2 3.5 9.7 3.5Z"
        fill="#3776AB"
      />
      <path
        d="M12.2 22C17.1 22 16.8 19.9 16.8 19.9L16.8 17.7H12V17H18.8C18.8 17 22 17.4 22 12.5C22 7.6 19.2 7.9 19.2 7.9H17.6V10.1C17.6 12.6 15.5 12.6 15.5 12.6H10.7C10.7 12.6 8.7 12.5 8.7 14.5V19.7C8.7 19.7 8.3 22 12.2 22ZM14.3 20.5C13.8 20.5 13.4 20.1 13.4 19.6C13.4 19.1 13.8 18.7 14.3 18.7C14.8 18.7 15.2 19.1 15.2 19.6C15.2 20.1 14.8 20.5 14.3 20.5Z"
        fill="#FFD43B"
      />
    </svg>
  );
}

// 11. FastAPI Official Logo
export function FastAPILogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#009688" />
      <path d="M13 3L6 13H12L11 21L18 11H12L13 3Z" fill="#FFFFFF" />
    </svg>
  );
}

// 12. Flask Official Logo
export function FlaskLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M10 2V5C8.3 5 7 6.3 7 8C7 9.5 8.1 10.7 9.5 11L5.3 19C4.4 20.7 5.6 22 7.5 22H16.5C18.4 22 19.6 20.7 18.7 19L14.5 11C15.9 10.7 17 9.5 17 8C17 6.3 15.7 5 14 5V2H10ZM12 8C12.6 8 13 8.4 13 9C13 9.6 12.6 10 12 10C11.4 10 11 9.6 11 9C11 8.4 11.4 8 12 8Z"
        fill="#F8FAFC"
        stroke="#94A3B8"
        strokeWidth="1.2"
      />
    </svg>
  );
}

// 13. Django Official Logo
export function DjangoLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#092E20" />
      <text x="12" y="16.5" fill="#44B78B" fontSize="11" fontWeight="bold" fontFamily="serif" textAnchor="middle">
        dj
      </text>
    </svg>
  );
}

// 14. Java Official Logo
export function JavaLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 14C6 14 7 16 12 16C17 16 18 14 18 14" stroke="#5382A1" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 18C5 18 7.5 20.5 12 20.5C16.5 20.5 19 18 19 18" stroke="#E76F00" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 2C9 4 10 6 13 7C14.5 7.5 15 9 14 11" stroke="#E76F00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 2C12 4 13 5.5 15.5 6.5" stroke="#5382A1" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// 15. Spring Boot Official Logo
export function SpringBootLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7.2V16.8L12 22L21 16.8V7.2L12 2Z" fill="#6DB33F" />
      <path
        d="M12 6C9 9 8 13 10 16C11 17.5 13 18 14 18C16.5 18 18 16 18 13.5C18 9 13.5 6.5 12 6Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 16. Hibernate Official Logo
export function HibernateLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#BCAE79" />
      <path d="M4 6V11C4 12.7 7.6 14 12 14C16.4 14 20 12.7 20 11V6" stroke="#59666C" strokeWidth="1.5" />
      <path d="M4 11V16C4 17.7 7.6 19 12 19C16.4 19 20 17.7 20 16V11" stroke="#FF6B00" strokeWidth="1.8" />
    </svg>
  );
}

// 17. React Official Logo
export function ReactLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(120 12 12)" />
    </svg>
  );
}

// 18. Next.js Official Logo
export function NextjsLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#000000" stroke="#FFFFFF" strokeWidth="1.2" />
      <path d="M8 8V16H10V10.5L14.8 16.5H16.5L10.5 8.5H8V8Z" fill="#FFFFFF" />
      <path d="M15 8V13.5H16.5V8H15Z" fill="#FFFFFF" />
    </svg>
  );
}

// 19. Node.js Official Logo
export function NodejsLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7.2V16.8L12 22L21 16.8V7.2L12 2Z" fill="#339933" />
      <path d="M9 10C9 8.5 10 7.5 11.5 7.5C13 7.5 14 8.5 14 10V14C14 15.5 13 16.5 11.5 16.5C10 16.5 9 15.5 9 14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 20. Tailwind CSS Official Logo
export function TailwindLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6.5 9.5C7.5 7.5 9.5 6.5 12.5 6.5C16.5 6.5 17.5 9.5 19.5 10C21.5 10.5 22.5 9.5 23 8.5C22 10.5 20 11.5 17 11.5C13 11.5 12 8.5 10 8C8 7.5 7 8.5 6.5 9.5ZM1 15.5C2 13.5 4 12.5 7 12.5C11 12.5 12 15.5 14 16C16 16.5 17 15.5 17.5 14.5C16.5 16.5 14.5 17.5 11.5 17.5C7.5 17.5 6.5 14.5 4.5 14C2.5 13.5 1.5 14.5 1 15.5Z"
        fill="#38BDF8"
      />
    </svg>
  );
}

// 21. Flutter Official Logo
export function FlutterLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M14 2L4 12L7.5 15.5L19 4H14Z" fill="#02569B" />
      <path d="M13.5 13.5L9.5 17.5L14 22H19L13.5 16.5L16 14L13.5 13.5Z" fill="#0175C2" />
      <path d="M9.5 17.5L13.5 13.5L16 16L12 20L9.5 17.5Z" fill="#29B6F6" />
    </svg>
  );
}

// 22. React Native Official Logo
export function ReactNativeLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 12 12)" />
    </svg>
  );
}

// 23. Firebase Official Logo
export function FirebaseLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 17L7 4L11 11L4 17Z" fill="#FFA000" />
      <path d="M11 11L14 7L20 17L11 11Z" fill="#F57C00" />
      <path d="M4 17L12 22L20 17L11 11L4 17Z" fill="#FFCA28" />
    </svg>
  );
}

// 24. AWS Official Logo
export function AWSLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 15C8 18 16 18 21 15M21 15C19.5 15.5 18 16.5 17 17.5M21 15C20.5 13.8 20 12.5 19.5 11"
        stroke="#FF9900"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="12" y="10" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
        AWS
      </text>
    </svg>
  );
}

// 25. Docker Official Logo
export function DockerLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22 12C21.5 12 20.5 11.5 20 10.5C18.5 10.5 17.5 11.5 17 12H2C2 17 6 21 13 21C19.5 21 22 16.5 22 13.5V12ZM5 11H7V9H5V11ZM8 11H10V9H8V11ZM11 11H13V9H11V11ZM8 8H10V6H8V8ZM11 8H13V6H11V8ZM14 11H16V9H14V11Z"
        fill="#2496ED"
      />
    </svg>
  );
}

// 26. Kubernetes Official Logo
export function KubernetesLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z"
        stroke="#326CE5"
        strokeWidth="1.8"
        fill="#326CE5"
        fillOpacity="0.2"
      />
      <circle cx="12" cy="12" r="3" fill="#326CE5" />
      <line x1="12" y1="5" x2="12" y2="9" stroke="#326CE5" strokeWidth="1.5" />
      <line x1="12" y1="15" x2="12" y2="19" stroke="#326CE5" strokeWidth="1.5" />
      <line x1="5.5" y1="8.5" x2="9" y2="10.5" stroke="#326CE5" strokeWidth="1.5" />
      <line x1="15" y1="13.5" x2="18.5" y2="15.5" stroke="#326CE5" strokeWidth="1.5" />
      <line x1="5.5" y1="15.5" x2="9" y2="13.5" stroke="#326CE5" strokeWidth="1.5" />
      <line x1="15" y1="10.5" x2="18.5" y2="8.5" stroke="#326CE5" strokeWidth="1.5" />
    </svg>
  );
}

// 27. Kali Linux Official Logo
export function KaliLinuxLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#0B1322" stroke="#268BEE" strokeWidth="1.5" />
      <path
        d="M6 13C8 9 12 7 15 8C17 8.7 18 10.5 18 13C17 12 15 11.5 13.5 12C11 13 10 16 7 17C6 16 5.5 14.5 6 13Z"
        fill="#268BEE"
      />
      <circle cx="15.5" cy="8.5" r="1" fill="#FFFFFF" />
    </svg>
  );
}

// 28. Wireshark Official Logo
export function WiresharkLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17C6 17 9 15 11 12C12 7 16 3 20 2C19 6 17 11 14 14C11 17 7 19 3 17Z"
        fill="#167EC4"
      />
      <path d="M2 19C7 19 12 18 17 21C12 21 7 21 2 19Z" fill="#38BDF8" />
    </svg>
  );
}

// 29. OWASP Official Logo
export function OWASPLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 6V12C4 17 7.5 21 12 22C16.5 21 20 17 20 12V6L12 2Z" fill="#1E293B" stroke="#FF6B00" strokeWidth="1.6" />
      <text x="12" y="14.5" fill="#FF6B00" fontSize="6" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
        OWASP
      </text>
    </svg>
  );
}

// 30. Power BI Official Logo
export function PowerBILogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="13" width="4" height="8" rx="1.5" fill="#F2C811" />
      <rect x="10" y="8" width="4" height="13" rx="1.5" fill="#E6AD10" />
      <rect x="16" y="3" width="4" height="18" rx="1.5" fill="#B8860B" />
    </svg>
  );
}

// 31. Tableau Official Logo
export function TableauLogo({ className = "w-4 h-4", size = 16 }: LogoProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Center Orange Cross */}
      <path d="M11 7H13V17H11V7ZM7 11H17V13H7V11Z" fill="#E97627" />
      {/* Top Blue Plus */}
      <path d="M11.5 2H12.5V5H11.5V2ZM10 3.5H14V4.5H10V3.5Z" fill="#2B5B84" />
      {/* Right Blue Plus */}
      <path d="M19 11.5H22V12.5H19V11.5ZM20.5 10V14H19.5V10H20.5Z" fill="#79B3D2" />
      {/* Bottom Plus */}
      <path d="M11.5 19H12.5V22H11.5V19ZM10 20.5H14V21.5H10V20.5Z" fill="#2B5B84" />
      {/* Left Plus */}
      <path d="M2 11.5H5V12.5H2V11.5ZM3.5 10V14H2.5V10H3.5Z" fill="#79B3D2" />
    </svg>
  );
}

