# Smart Love Hotel 🏨

<div style="padding: 20px; border: 2px solid #ddd; max-width: 900px; border-radius: 10px; margin: 20px 0;">
  <img src="./public/assets/1.png" alt="Smart Love Hotel" style="width: 100%; max-width: 900px; margin-bottom: 15px; border-radius: 8px"/>
  <img src="./public/assets/2.png" alt="Smart Love Hotel" style="width: 100%; max-width: 900px; margin-bottom: 15px; border-radius: 8px"/>
  <img src="./public/assets/3.png" alt="Smart Love Hotel" style="width: 100%; max-width: 900px; margin-bottom: 15px; border-radius: 8px"/>
</div>

[![Website](https://img.shields.io/badge/Website-smart--pro.vercel.app-blue?style=for-the-badge&logo=vercel)](https://smart-pro.vercel.app)
[![Figma](https://img.shields.io/badge/Figma-Design-F24E1E?style=for-the-badge&logo=figma)](https://www.figma.com/design/J7di2I31IH4OcXnNOmwgAe/Hotel---Smart-Love?node-id=218-1065&t=mRZzxxdUouw2DlMM-1)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

# 🌟 Smart Love Hotel

## 🎯 Sobre el Proyecto

Smart Love Hotel es una plataforma moderna de reservas hoteleras ubicada en Lima, Perú. Desarrollada con tecnologías morder, ofrece un sistema eficiente y seguro para la gestión de reservas y administración hotelera.
El proyecto se centra en proporcionar una experiencia de usuario óptima mediante una interfaz intuitiva y funcionalidades avanzadas.

## ✨ Características

- 🏷️ Reserva de habitaciones en tiempo real
- 📅 Calendario interactivo para selección de fechas
- 🔍 Filtros avanzados de búsqueda
- 📱 Diseño responsive y moderno
- 🌙 Modo oscuro/claro
- 🔒 Autenticación de usuarios
- 💳 Gestión de reservas
- 📊 Panel de administración intuitivo
- 🔄 Sincronización en tiempo real
- 📈 Análisis de disponibilidad

## 🛠️ Tecnologías

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass)](https://sass-lang.com/)
[![DayJS](https://img.shields.io/badge/Day.js-fb6052?style=for-the-badge)](https://day.js.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=react&logoColor=white)](https://react-hook-form.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)

## 👨‍💻 Desarrolladores

[![Luis Fernando](https://img.shields.io/badge/Luis_Fernando-Shun-181717?style=for-the-badge&logo=github)](https://github.com/Luis-Fernando-MP)
[![Arian Reyes](https://img.shields.io/badge/Arian_Reyes-Dev-181717?style=for-the-badge&logo=github)](https://github.com/arianr2014)

## 🚀 Instalación

1. Instala [Node.js v20](https://nodejs.org/en/)

2. Instala PNPM globalmente:

   ```bash
   npm install -g pnpm
   ```

3. Clona el repositorio:

   ```bash
   git clone https://github.com/Luis-Fernando-MP/smartLove.git
   cd smart-love-hotel
   ```

4. Instala las dependencias:

   ```bash
   pnpm install
   ```

5. Configura las variables de entorno:

   - Crea un archivo `.env` en la raíz del proyecto
   - Copia las siguientes variables y configura sus valores:

   ```env
   # API URL
   NEXT_PUBLIC_API_URL=

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   CLERK_WEBHOOK_USER_EVENTS=
   CLERK_WEBHOOK_USER_EVENTS_DEV=

   # Database
   DATABASE_URL=
   ```

6. Ejecuta el proyecto en modo desarrollo:

   ```bash
   pnpm dev
   ```

7. Para compilar el proyecto para producción:
   ```bash
   pnpm build
   pnpm start
   ```
