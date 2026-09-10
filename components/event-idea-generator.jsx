"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Utensils, Music, Image as ImageIcon, PartyPopper, Loader2 } from "lucide-react";

export default function EventIdeaGenerator() {
  const [eventType, setEventType] = useState("");
  const [vibe, setVibe] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState(null);
  const [activeTab, setActiveTab] = useState("decor");

  const handleGenerate = () => {
    if (!eventType) return;
    setIsGenerating(true);
    
    // Simulating an API call to an AI planner service
    setTimeout(() => {
      setIdeas({
        decoration: [
          { 
            title: "Fairy Light Canopy", 
            desc: "String lights draped across the ceiling for a magical, starry night feel.", 
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80" 
          },
          { 
            title: "Floral Centerpieces", 
            desc: "Minimalist local flowers in rustic vases to keep tables elegant but conversational.", 
            image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&q=80" 
          }
        ],
        food: [
          { title: "Interactive Food Stations", desc: "A live taco or pasta bar where guests can customize their plates." },
          { title: "Signature Welcome Drink", desc: "A themed mocktail or cocktail matching your event's color palette." }
        ],
        entertainment: [
          { title: "Live Acoustic Duo", desc: "A soft acoustic band to play in the background during meals." },
          { title: "Themed Photo Booth", desc: "A customized backdrop with fun, quirky props related to the event." }
        ],
        extraTips: [
          "Send out digital personalized video invites instead of standard text.",
          "Create a collaborative Spotify playlist where guests add their favorite songs beforehand.",
          "Give away a small, memorable personalized party favor (e.g., custom candles)."
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="w-full border-purple-500/20 shadow-lg shadow-purple-500/5 mb-8">
      <CardHeader className="bg-purple-500/5 border-b border-purple-500/10">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-purple-500" />
          AI Event Architect & Idea Generator
        </CardTitle>
        <CardDescription>
          Need inspiration? Tell us what you&apos;re planning, and we&apos;ll generate decoration images, food menus, and entertainment plans to make it unforgettable!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {!ideas ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  What kind of event is it?
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., Diwali Party, Tech Meetup, 25th Birthday"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  What&apos;s the vibe or theme?
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., Elegant, Casual, High-energy, Traditional"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={!eventType || isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2 mt-4"
            >
              {isGenerating ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Generating Magic...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Generate Ideas</>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Your Tailored Event Plan</h3>
              <Button variant="ghost" size="sm" onClick={() => setIdeas(null)}>Start Over</Button>
            </div>

            <div className="flex space-x-1 border-b overflow-x-auto pb-px">
              <button
                onClick={() => setActiveTab('decor')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'decor' ? 'border-purple-600 text-purple-600' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'}`}
              >
                <ImageIcon className="h-4 w-4"/> Decor Images
              </button>
              <button
                onClick={() => setActiveTab('food')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'food' ? 'border-purple-600 text-purple-600' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'}`}
              >
                <Utensils className="h-4 w-4"/> Food & Drinks
              </button>
              <button
                onClick={() => setActiveTab('entertainment')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'entertainment' ? 'border-purple-600 text-purple-600' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'}`}
              >
                <Music className="h-4 w-4"/> Entertainment
              </button>
              <button
                onClick={() => setActiveTab('wow')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'wow' ? 'border-purple-600 text-purple-600' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'}`}
              >
                <PartyPopper className="h-4 w-4"/> The &quot;Wow&quot; Factor
              </button>
            </div>

            <div className="mt-4">
              {activeTab === 'decor' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ideas.decoration.map((item, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="relative h-48 w-full bg-muted">
                        {/* Using native img to avoid next.config.js remote pattern errors for unsplash */}
                        <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'food' && (
                <div className="grid gap-4">
                  {ideas.food.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 rounded-lg border bg-card">
                      <div className="p-2 bg-orange-500/10 text-orange-500 rounded-full shrink-0">
                        <Utensils className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'entertainment' && (
                <div className="grid gap-4">
                  {ideas.entertainment.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 rounded-lg border bg-card">
                      <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full shrink-0">
                        <Music className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'wow' && (
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      Make it Special
                    </h4>
                    <ul className="space-y-4">
                      {ideas.extraTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <PartyPopper className="h-5 w-5 text-pink-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}