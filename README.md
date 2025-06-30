# Vocare Fullstack Challenge – Calendar App

This project is a fullstack prototype developed for the Vocare Tech Challenge. It includes calendar views and appointment management functionality, built using the given Supabase database schema.

## To run the project locally:

git clone https://github.com/ShubhamShrestha25/Vocare-Calendar
cd Vocare-Calendar
npm install
npm run dev

## 📌 Features

📅 **Calendar views**

- Monthly and weekly views
- Hoverable appointment details using `shadcn/ui` hover cards

📝 **Appointment management**

- Create, read, update and delete appointments
- Appointment list view of present and past data.
- Filter appointments by category, patient and time range
- Week and Monthly view.

⚙️ **Supabase integration**

- Real-time data fetching and updates

## 🛠️ Tech Stack

**Frontend**: Next.js, TailwindCSS, shadcn/ui
**Backend**: Next.js API Routes
**Database**: Supabase
**Deployment**: Vercel

## ⚠️ Notes

**Database Schema**: I used the exact schema as specified. No columns or tables were added.

**Technical Decision**: I used client-side filtering for simplicity, since the dataset is small. For larger data in production, filtering would be moved to Supabase to optimize performance and reduce data load. I only implemented CRUD operations for appointments — CRUD functionality for categories and patients was not included in this version. Instead, I used the existing patient names and category as a dropdown selection when creating or editing appointments.

**Limitations**: This project might have some minor edge cases.

**Errors**: I noticed one error. Since the Supabase project is shared with other applicants, some appointments created by others are linked to related data (e.g., activities). Attempting to delete those records causes a foreign key constraint error (Update or delete on table "appointments" violates foreign key constraint "activities_appointment_fkey" on table "activities"). Therefore, only appointments created using this app can be deleted.
