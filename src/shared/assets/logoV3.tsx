import type { JSX } from 'react'

const LogoV3 = ({ className = '' }: { className?: string }): JSX.Element => {
  return (
    <svg className={className} width='155' height='90' viewBox='0 0 155 90' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M90 65.0976C90 81.9403 67.1377 90 44.4365 90C22.0572 90 0 82.2503 0 67.4742C0 58.2778 9.0161 49.1848 24.7943 46.9116L25.1163 47.4282C14.0072 49.9082 7.72809 57.2445 7.72809 64.9943C7.72809 80.8037 26.5653 88.6567 45.4025 88.6567C63.9177 88.6567 82.2719 81.0103 82.2719 65.6142C82.1109 40.2985 16.7442 39.8852 16.7442 16.8427C16.7442 5.16647 30.7513 0 45.5635 0C51.6816 0 57.7996 0.826636 63.2737 2.47991C67.6207 3.61653 70.6798 4.95982 72.7728 4.95982C74.3828 4.95982 75.5098 4.13318 75.9928 2.06659H76.7978V15.6028H75.9928C71.9678 5.78645 58.1216 1.13662 45.4025 1.13662C32.6834 1.13662 20.9302 5.78645 20.9302 14.6728C20.9302 37.302 90 37.9219 90 65.0976Z'
        fill='url(#paint0_linear_361_41)'
      />
      <path
        d='M112.254 83.5714C112.254 89.0476 114.454 89.1667 120.129 89.1667V90H99.5141V89.1667C105.189 89.1667 107.39 89.0476 107.39 83.5714V21.1905C107.39 15.7143 105.189 15.5952 99.5141 15.5952V14.7619H112.254V47.381C112.254 52.8571 114.454 52.7381 120.129 52.7381H124.994C157.538 52.7381 161.823 1.30952 114.454 1.30952C56.6621 1.30952 60.484 69.4048 97.1978 75.8333L97.082 76.6667C54.4616 73.8095 48.6708 0 114.454 0C168.309 0 165.066 54.0476 124.994 54.0476H112.254V83.5714Z'
        fill='url(#paint1_linear_361_41)'
      />
      <defs>
        <linearGradient id='paint0_linear_361_41' x1='0' y1='0' x2='536.627' y2='0' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FBB040' />
          <stop offset='1' stopColor='#F9ED32' />
        </linearGradient>
        <linearGradient id='paint1_linear_361_41' x1='64.0673' y1='0' x2='294.757' y2='0' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FBB040' />
          <stop offset='1' stopColor='#F9ED32' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default LogoV3
