import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16">
      <Container>
        <SectionHeading eyebrow="Contact" title={<>Get in <span className="gradient-text">Touch</span></>} subtitle="Have a question? We are here to help you pick the right path." align="left" />
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Details</h3>
            <p className="text-gray-600">Email: hello@edunova.com</p>
            <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
            <p className="text-gray-600">Location: 24 Learning Avenue, New York</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 p-8 border border-primary-100/60 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Start your journey</h3>
            <p className="text-gray-600 mb-4">Tell us what you want to learn and we will guide you to the best course.</p>
            <a href="mailto:hello@edunova.com" className="btn-gradient inline-flex">Send Email</a>
          </div>
        </div>
      </Container>
    </main>
  );
}
