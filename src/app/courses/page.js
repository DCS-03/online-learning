import Link from 'next/link';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';

const courses = [
  { title: 'Web 3.0 Development', level: 'Intermediate', price: '$49' },
  { title: 'AI & ML Bootcamp', level: 'Advanced', price: '$59' },
  { title: 'UI/UX Design Masterclass', level: 'Beginner', price: '$39' },
];

export default function CoursesPage() {
  return (
    <main className="pt-24 pb-16">
      <Container>
        <SectionHeading eyebrow="Courses" title={<>Our <span className="gradient-text">Courses</span></>} subtitle="Choose from a growing collection of practical, high-impact learning paths." align="left" />
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-primary-600">{course.level}</p>
              <h3 className="text-xl font-bold text-gray-900 mt-2">{course.title}</h3>
              <p className="text-gray-600 mt-3">Build real-world skills through hands-on lessons and guided practice.</p>
              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl font-extrabold text-gray-900">{course.price}</span>
                <Link href="/contact" className="btn-outline inline-flex">Enroll</Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
