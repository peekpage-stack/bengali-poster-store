import { EmptyState } from '../components/ui.jsx';

export default function NotFound() {
  return <EmptyState title="This page has wandered off" text="The link may be old or mistyped. Let's get you back to the posters." to="/shop" cta="Back to the shop" />;
}
