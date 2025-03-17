import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import UserDashboard from "@/pages/UserDashboard";
import BookingPage from "@/pages/BookingPage";
import DestinationDetails from "@/pages/DestinationDetails";
import Checkout from "@/pages/Checkout";
import BackgroundStars from "./components/BackgroundStars";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={UserDashboard} />
      <Route path="/book" component={BookingPage} />
      <Route path="/destination/:id" component={DestinationDetails} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen bg-space-black overflow-x-hidden font-space text-white">
        <BackgroundStars />
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
