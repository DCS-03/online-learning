import Link from 'next/link';
import { FaStar, FaUsers, FaClock } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

const courses = [
  { title: 'Complete Web 3.0 Development', students: '3.2K', price: '$49', rating: 4.9, color: 'from-primary-500 to-primary-700' },
  { title: 'AI & Machine Learning Bootcamp', students: '2.8K', price: '$59', rating: 4.8, color: 'from-secondary-500 to-secondary-700' },
  { title: 'UX/UI Design Masterclass', students: '4.1K', price: '$39', rating: 4.9, color: 'from-rose-500 to-rose-700' },
];

export default function PopularCourses() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Top Courses" title={<>Popular <span className="gradient-text">Courses</span></>} subtitle="Hand-picked courses with the highest ratings and most enrollments" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div key={idx} className="card-3d bg-white rounded-3xl overflow-hidden border border-gray-100/50 hover:border-primary-200/50">
              <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    <FaStar />
                    <span className="text-gray-700 font-semibold">{course.rating}</span>
                  </div>
                  <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-semibold">Best Seller</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span><FaUsers className="inline mr-1" /> {course.students}</span>
                  <span><FaClock className="inline mr-1" /> 30h</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-2xl font-extrabold text-gray-900">{course.price}</span>
                  <Link href="#" className="bg-gray-900 hover:bg-primary-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">Enroll</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="#" className="btn-outline inline-flex items-center gap-2">
            View All Courses <FaClock />
          </Link>
        </div>
      </div>
    </section>
  );
}
