"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { useNearbyLocation } from "@/hooks/use-nearby-location";
import EventCard from "@/components/event-card";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowRight,
  Calendar,
  Loader2,
  MapPin,
  MapPinOff,
  Navigation,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";


// ─── Location Permission Banner ───────────────────────────────────────────────

function LocationBanner({ status, city, state, error, onRequest }) {
  if (status === "resolved") return null; // Events section handles display

  if (status === "idle") {
    return (
      <div className="mb-12 rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-400">
          <Navigation className="h-6 w-6" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold text-lg mb-1">Find Events Near You</h3>
          <p className="text-muted-foreground text-sm">
            Allow location access to discover events happening in your area right now.
          </p>
        </div>
        <Button
          onClick={onRequest}
          className="bg-purple-600 hover:bg-purple-700 text-white gap-2 shrink-0"
        >
          <MapPin className="h-4 w-4" />
          Use My Location
        </Button>
      </div>
    );
  }

  if (status === "requesting" || status === "geocoding") {
    return (
      <div className="mb-12 rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 flex items-center gap-4">
        <Loader2 className="h-6 w-6 text-purple-400 animate-spin shrink-0" />
        <div>
          <p className="font-medium">
            {status === "requesting"
              ? "Waiting for location permission…"
              : "Determining your city…"}
          </p>
          <p className="text-sm text-muted-foreground">This will only take a moment.</p>
        </div>
      </div>
    );
  }

  if (status === "denied" || status === "error") {
    return (
      <div className="mb-12 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 flex items-center gap-4">
        <MapPinOff className="h-6 w-6 text-orange-400 shrink-0" />
        <div>
          <p className="font-medium text-orange-300">
            {status === "denied"
              ? "Location access denied"
              : "Couldn\'t detect your location"}
          </p>
          <p className="text-sm text-muted-foreground">
            {error || "Enable location in your browser settings to see local events."}
          </p>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ExplorePage = () => {
  const router = useRouter();

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  // Browser Geolocation → reverse geocoded city/state
  const { status: locationStatus, city: detectedCity, state: detectedState, error: locationError, requestLocation } =
    useNearbyLocation();

  const handleEventClick = React.useCallback((slug) => router.push(`/events/${slug}`), [router]);
  const handleViewLocalEvents = React.useCallback(() => router.push("/explore?type=local"), [router]);
  const handleViewPopularEvents = React.useCallback(() => router.push("/explore?type=popular"), [router]);
  const handleCategoryClick = React.useCallback((categoryId) =>
    router.push(`/explore?category=${categoryId}`), [router]);

  // ── Convex queries ──────────────────────────────────────────────────────────

  const { data: featuredEvents, isLoading: loadingFeatured } = useConvexQuery(
    api.explore.getFeaturedEvents,
    { limit: 3 }
  );

  // Only query once geolocation has resolved (or skip otherwise)
  const { data: localEvents, isLoading: loadingLocal } = useConvexQuery(
    api.explore.getEventsByLocation,
    locationStatus === "resolved"
      ? { city: detectedCity || undefined, state: detectedState || undefined, limit: 8 }
      : "skip"
  );

  const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(
    api.explore.getPopularEvents,
    { limit: 7 }
  );

  const categoriesWithCounts = [
    { id: "tech", label: "Technology", count: 12, icon: "💻" },
    { id: "music", label: "Music", count: 8, icon: "🎵" },
    { id: "art", label: "Art", count: 5, icon: "🎨" },
    { id: "sports", label: "Sports", count: 20, icon: "⚽" },
    { id: "holi", label: "Holi", count: 15, icon: "🌈" },
    { id: "diwali", label: "Diwali", count: 24, icon: "🪔" },
    { id: "newyear", label: "New Year", count: 30, icon: "🎆" },
    { id: "comedy", label: "Stand-up Comedy", count: 18, icon: "🎤" },
    { id: "openmic", label: "Open Mic", count: 10, icon: "🎙️" },
    { id: "birthday", label: "Birthday", count: 4, icon: "🎂" },
    { id: "wedding", label: "Weddings", count: 2, icon: "💍" },
    { id: "anniversary", label: "Anniversary", count: 3, icon: "🥂" },
  ];

  return (
    <>
      {/* Hero Title */}
      <div className="pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
          Explore featured events, find what&apos;s happening locally, or browse
          events across India
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/create-event">
            <Button
              id="hero-create-event-btn"
              size="lg"
              className="gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Host an Event
            </Button>
          </Link>
          <Link href="/create-event?assistant=true">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full px-6 w-full sm:w-auto border-purple-500/30 hover:bg-purple-500/10 text-purple-600 dark:text-purple-400"
            >
              <Sparkles className="w-4 h-4" />
              AI Event Ideas & Planner
            </Button>
          </Link>
        </div>
      </div>

      {/* Location Permission Banner */}
      <LocationBanner
        status={locationStatus}
        city={detectedCity}
        state={detectedState}
        error={locationError}
        onRequest={requestLocation}
      />

      {/* Featured Carousel */}
      {featuredEvents && featuredEvents.length > 0 && (
        <div className="mb-16">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {featuredEvents.map((event) => (
                <CarouselItem key={event._id}>
                  <div
                    className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => handleEventClick(event.slug)}
                  >
                    {event.coverImage ? (
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: event.themeColor }}
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/30" />
                    <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                      <Badge className="w-fit mb-4" variant="secondary">
                        {event.city}, {event.state || event.country}
                      </Badge>
                      <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                        {event.title}
                      </h2>
                      <p className="text-lg text-white/90 mb-4 max-w-2xl line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-white/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {format(event.startDate, "PPP")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{event.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">
                            {event.registrationCount} registered
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      )}

      {/* Events Near You */}
      {locationStatus === "resolved" && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="w-5 h-5 text-purple-400" />
                <h2 className="text-3xl font-bold">Events Near You</h2>
              </div>
              <p className="text-muted-foreground">
                Happening in{" "}
                <span className="text-purple-400 font-medium">
                  {detectedCity || detectedState || "your area"}
                </span>
              </p>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleViewLocalEvents}
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {loadingLocal ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="h-48 animate-pulse bg-muted/40" />
              ))}
            </div>
          ) : localEvents && localEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {localEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  variant="compact"
                  onClick={() => handleEventClick(event.slug)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-10 text-center border-dashed">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-semibold text-lg mb-1">
                No events found near {detectedCity || "you"}
              </h3>
              <p className="text-muted-foreground text-sm">
                Check back soon — or browse popular events across India below.
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Browse by Category */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {categoriesWithCounts.map((category) => (
            <Card
              key={category.id}
              className="py-2 group cursor-pointer hover:shadow-lg transition-all hover:border-purple-500/50"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="px-3 sm:p-6 flex items-center gap-3">
                <div className="text-3xl sm:text-4xl">{category.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} Event{category.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Events Across Country */}
      {popularEvents && popularEvents.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-1">Popular Across India</h2>
              <p className="text-muted-foreground">Trending events nationwide</p>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleViewPopularEvents}
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                variant="list"
                onClick={() => handleEventClick(event.slug)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loadingFeatured &&
        !loadingPopular &&
        (!featuredEvents || featuredEvents.length === 0) &&
        (!popularEvents || popularEvents.length === 0) && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold">No events yet</h2>
              <p className="text-muted-foreground">
                Be the first to create an event in your area!
              </p>
              <Button asChild className="gap-2">
                <a href="/create-event">Create Event</a>
              </Button>
            </div>
          </Card>
        )}
    </>
  );
};

export default ExplorePage;