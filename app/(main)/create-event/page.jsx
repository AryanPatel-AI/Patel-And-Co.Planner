"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Globe,
  Loader2,
  MapPin,
  Plus,
  Sparkles,
  Tag,
  Ticket,
  Users,
  X,
} from "lucide-react";

// ─── STEP CONFIG ─────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Basics", icon: Calendar },
  { id: 2, label: "Location", icon: MapPin },
  { id: 3, label: "Capacity", icon: Users },
  { id: 4, label: "Review", icon: Check },
];

const TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Mumbai",
  "Asia/Delhi",
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry",
];

const THEME_COLORS = [
  "#1e3a8a", "#7c3aed", "#db2777", "#dc2626",
  "#d97706", "#16a34a", "#0891b2", "#9333ea",
];

// ─── HELPER ──────────────────────────────────────────────────────────────────

function toTimestamp(dateStr, timeStr) {
  if (!dateStr) return null;
  const combined = `${dateStr}T${timeStr || "00:00"}:00`;
  return new Date(combined).getTime();
}

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  done
                    ? "bg-purple-600 border-purple-600 text-white"
                    : active
                    ? "border-purple-500 text-purple-400 bg-purple-500/10"
                    : "border-gray-700 text-gray-600"
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  active ? "text-purple-400" : done ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`h-px w-16 sm:w-24 mx-1 mb-4 transition-colors duration-300 ${
                  done ? "bg-purple-600" : "bg-gray-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── STEP 1: BASICS ──────────────────────────────────────────────────────────

function StepBasics({ form, onChange }) {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag) && form.tags.length < 10) {
      onChange("tags", [...form.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (t) => onChange("tags", form.tags.filter((x) => x !== t));

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Event Title <span className="text-red-400">*</span>
        </label>
        <Input
          id="event-title"
          placeholder="e.g. React Meetup Bangalore 2026"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Description <span className="text-red-400">*</span>
        </label>
        <Textarea
          id="event-description"
          placeholder="Tell attendees what your event is about…"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={4}
          className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500 resize-none"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Category <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              id={`category-${cat.id}`}
              onClick={() => onChange("category", cat.id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-all ${
                form.category === cat.id
                  ? "border-purple-500 bg-purple-500/15 text-purple-300"
                  : "border-gray-700 bg-white/5 text-gray-400 hover:border-gray-500"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="truncate">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Start Date <span className="text-red-400">*</span>
          </label>
          <Input
            id="event-start-date"
            type="date"
            value={form.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
            className="bg-white/5 border-gray-700 focus:border-purple-500 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Start Time</label>
          <Input
            id="event-start-time"
            type="time"
            value={form.startTime}
            onChange={(e) => onChange("startTime", e.target.value)}
            className="bg-white/5 border-gray-700 focus:border-purple-500 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            End Date <span className="text-red-400">*</span>
          </label>
          <Input
            id="event-end-date"
            type="date"
            value={form.endDate}
            onChange={(e) => onChange("endDate", e.target.value)}
            className="bg-white/5 border-gray-700 focus:border-purple-500 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">End Time</label>
          <Input
            id="event-end-time"
            type="time"
            value={form.endTime}
            onChange={(e) => onChange("endTime", e.target.value)}
            className="bg-white/5 border-gray-700 focus:border-purple-500 text-white"
          />
        </div>
      </div>

      {/* Timezone */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Timezone</label>
        <Select value={form.timezone} onValueChange={(v) => onChange("timezone", v)}>
          <SelectTrigger id="event-timezone" className="bg-white/5 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-gray-700">
            {TIMEZONES.map((tz) => (
              <SelectItem key={tz} value={tz} className="text-white focus:bg-purple-500/20">
                {tz}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Tags (optional)</label>
        <div className="flex gap-2">
          <Input
            id="event-tag-input"
            placeholder="Add a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            id="add-tag-btn"
            onClick={addTag}
            className="border-gray-700 shrink-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {form.tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() => removeTag(t)}
              >
                <Tag className="w-3 h-3" />
                {t}
                <X className="w-3 h-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Theme Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Theme Color{" "}
          <span className="text-xs text-gray-500">(Pro feature — default used for free)</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {THEME_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange("themeColor", color)}
              className={`w-9 h-9 rounded-full border-2 transition-all ${
                form.themeColor === color ? "border-white scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STEP 2: LOCATION ────────────────────────────────────────────────────────

function StepLocation({ form, onChange }) {
  return (
    <div className="space-y-6">
      {/* Location Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Location Type</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "physical", label: "In-Person", icon: MapPin },
            { value: "online", label: "Online", icon: Globe },
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              id={`location-type-${value}`}
              onClick={() => onChange("locationType", value)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                form.locationType === value
                  ? "border-purple-500 bg-purple-500/15 text-purple-300"
                  : "border-gray-700 bg-white/5 text-gray-400 hover:border-gray-500"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {form.locationType === "physical" ? (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              City <span className="text-red-400">*</span>
            </label>
            <Input
              id="event-city"
              placeholder="e.g. Bangalore"
              value={form.city}
              onChange={(e) => onChange("city", e.target.value)}
              className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">State</label>
            <Select value={form.state} onValueChange={(v) => onChange("state", v)}>
              <SelectTrigger id="event-state" className="bg-white/5 border-gray-700 text-white">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-gray-700 max-h-60">
                {INDIAN_STATES.map((s) => (
                  <SelectItem key={s} value={s} className="text-white focus:bg-purple-500/20">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Country</label>
            <Input
              id="event-country"
              value={form.country}
              onChange={(e) => onChange("country", e.target.value)}
              className="bg-white/5 border-gray-700 focus:border-purple-500 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Venue Name</label>
            <Input
              id="event-venue"
              placeholder="e.g. NIMHANS Convention Centre"
              value={form.venue}
              onChange={(e) => onChange("venue", e.target.value)}
              className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Address</label>
            <Textarea
              id="event-address"
              placeholder="Street address, landmark…"
              value={form.address}
              onChange={(e) => onChange("address", e.target.value)}
              rows={2}
              className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500 resize-none"
            />
          </div>
        </>
      ) : (
        <>
          {/* Online event — still need a city for filtering purposes */}
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-300 mb-1">Online Event</p>
                <p className="text-xs text-gray-400">
                  Attendees can join from anywhere. We&apos;ll still ask for your city so
                  local attendees can discover your event.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Organizer City <span className="text-red-400">*</span>
            </label>
            <Input
              id="event-city-online"
              placeholder="Your city (for discoverability)"
              value={form.city}
              onChange={(e) => onChange("city", e.target.value)}
              className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Country</label>
            <Input
              id="event-country-online"
              value={form.country}
              onChange={(e) => onChange("country", e.target.value)}
              className="bg-white/5 border-gray-700 focus:border-purple-500 text-white"
            />
          </div>
        </>
      )}
    </div>
  );
}

// ─── STEP 3: CAPACITY & TICKETS ───────────────────────────────────────────────

function StepCapacity({ form, onChange }) {
  return (
    <div className="space-y-6">
      {/* Capacity */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Max Capacity <span className="text-red-400">*</span>
        </label>
        <Input
          id="event-capacity"
          type="number"
          min={1}
          max={100000}
          placeholder="e.g. 200"
          value={form.capacity}
          onChange={(e) => onChange("capacity", e.target.value)}
          className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Ticket Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Ticket Type</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "free", label: "Free", emoji: "🎟️", desc: "No charge for attendees" },
            { value: "paid", label: "Paid", emoji: "💳", desc: "Collect payment at entry" },
          ].map(({ value, label, emoji, desc }) => (
            <button
              key={value}
              type="button"
              id={`ticket-type-${value}`}
              onClick={() => onChange("ticketType", value)}
              className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                form.ticketType === value
                  ? "border-purple-500 bg-purple-500/15 text-purple-300"
                  : "border-gray-700 bg-white/5 text-gray-400 hover:border-gray-500"
              }`}
            >
              <span className="text-2xl mb-1">{emoji}</span>
              <span className="font-semibold text-sm">{label}</span>
              <span className="text-xs text-gray-500 mt-1">{desc}</span>
            </button>
          ))}
        </div>
      </div>

      {form.ticketType === "paid" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Ticket Price (₹) <span className="text-red-400">*</span>
          </label>
          <Input
            id="event-price"
            type="number"
            min={0}
            placeholder="e.g. 500"
            value={form.ticketPrice}
            onChange={(e) => onChange("ticketPrice", e.target.value)}
            className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
          />
          <p className="text-xs text-gray-500">
            Payment is collected at the venue. Attendees receive a QR code ticket.
          </p>
        </div>
      )}

      {/* Cover image URL */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Cover Image URL (optional)</label>
        <Input
          id="event-cover-image"
          type="url"
          placeholder="https://example.com/my-event-banner.jpg"
          value={form.coverImage}
          onChange={(e) => onChange("coverImage", e.target.value)}
          className="bg-white/5 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
        />
        {form.coverImage && (
          <div className="mt-2 rounded-lg overflow-hidden h-32 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.coverImage}
              alt="Cover preview"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STEP 4: REVIEW ──────────────────────────────────────────────────────────

function StepReview({ form }) {
  const cat = CATEGORIES.find((c) => c.id === form.category);

  const startTs = toTimestamp(form.startDate, form.startTime);
  const endTs = toTimestamp(form.endDate, form.endTime);

  const fmt = (ts) =>
    ts
      ? new Date(ts).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const rows = [
    { label: "Title", value: form.title },
    { label: "Category", value: cat ? `${cat.icon} ${cat.label}` : "—" },
    { label: "Starts", value: fmt(startTs) },
    { label: "Ends", value: fmt(endTs) },
    { label: "Timezone", value: form.timezone },
    {
      label: "Location",
      value:
        form.locationType === "online"
          ? "Online Event"
          : [form.venue, form.city, form.state, form.country]
              .filter(Boolean)
              .join(", "),
    },
    { label: "Capacity", value: form.capacity ? `${form.capacity} seats` : "—" },
    {
      label: "Ticket",
      value:
        form.ticketType === "paid" && form.ticketPrice
          ? `Paid — ₹${form.ticketPrice}`
          : "Free",
    },
    {
      label: "Tags",
      value: form.tags.length > 0 ? form.tags.join(", ") : "None",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex gap-4 px-5 py-3 ${
              i !== rows.length - 1 ? "border-b border-gray-800" : ""
            }`}
          >
            <span className="text-sm text-gray-500 w-24 shrink-0">{label}</span>
            <span className="text-sm text-gray-200 flex-1 break-all">{value || "—"}</span>
          </div>
        ))}
      </div>

      {form.description && (
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-sm text-gray-300 leading-relaxed">{form.description}</p>
        </div>
      )}

      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
        <p className="text-xs text-yellow-300">
          ⚡ You are creating this event on a <strong>Free plan</strong>. One free event is
          allowed. Upgrade to Pro for unlimited events, custom themes, and more.
        </p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  title: "",
  description: "",
  category: "",
  tags: [],
  startDate: "",
  startTime: "09:00",
  endDate: "",
  endTime: "18:00",
  timezone: "Asia/Kolkata",
  locationType: "physical",
  venue: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  capacity: "",
  ticketType: "free",
  ticketPrice: "",
  coverImage: "",
  themeColor: "#1e3a8a",
};

export default function CreateEventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createEvent = useMutation(api.events.createEvent);
  const generateAIEvent = useAction(api.ai.generateEventDetails);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  
  // AI Assistant Specific State
  const [showAIInput, setShowAIInput] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Check for assistant mode on mount
  useEffect(() => {
    if (searchParams.get("assistant") === "true") {
      setShowAIInput(true);
    }
  }, [searchParams]);

  const onChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please describe your event first.");
      return;
    }

    setIsGenerating(true);
    try {
      const details = await generateAIEvent({ prompt: aiPrompt });
      
      // Map AI response to form state
      setForm((prev) => ({
        ...prev,
        title: details.title || prev.title,
        description: details.description || prev.description,
        category: details.category || prev.category,
        tags: details.tags || prev.tags,
        capacity: details.capacity?.toString() || prev.capacity,
        locationType: details.locationType || prev.locationType,
        city: details.city || prev.city,
        ticketType: details.ticketType || prev.ticketType,
        ticketPrice: details.ticketPrice?.toString() || prev.ticketPrice,
      }));

      if (details.isMock) {
        toast.info("Using AI Demo Mode (Install API Key for real results)", {
          duration: 5000,
        });
      } else {
        toast.success("✨ AI has drafted your event! Please review the details.");
      }
      
      setShowAIInput(false); // Move to review/edit mode
    } catch (err) {
      toast.error("AI Generation failed: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Validation per step ──────────────────────────────────────────────────

  const validateStep = () => {
    if (step === 1) {
      if (!form.title.trim()) return "Event title is required.";
      if (!form.description.trim()) return "Description is required.";
      if (!form.category) return "Please select a category.";
      if (!form.startDate) return "Start date is required.";
      if (!form.endDate) return "End date is required.";
      const s = toTimestamp(form.startDate, form.startTime);
      const e = toTimestamp(form.endDate, form.endTime);
      if (e <= s) return "End date/time must be after start.";
    }
    if (step === 2) {
      if (!form.city.trim()) return "City is required.";
    }
    if (step === 3) {
      if (!form.capacity || Number(form.capacity) < 1)
        return "Capacity must be at least 1.";
      if (form.ticketType === "paid" && !form.ticketPrice)
        return "Enter a ticket price for paid events.";
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const eventId = await createEvent({
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        tags: form.tags,
        startDate: toTimestamp(form.startDate, form.startTime),
        endDate: toTimestamp(form.endDate, form.endTime),
        timezone: form.timezone,
        locationType: form.locationType,
        venue: form.venue || undefined,
        address: form.address || undefined,
        city: form.city.trim(),
        state: form.state || undefined,
        country: form.country || "India",
        capacity: Number(form.capacity),
        ticketType: form.ticketType,
        ticketPrice: form.ticketType === "paid" ? Number(form.ticketPrice) : undefined,
        coverImage: form.coverImage || undefined,
        themeColor: form.themeColor,
        hasPro: false,
      });

      toast.success("🎉 Event created successfully!");
      router.push("/my-events");
    } catch (err) {
      toast.error(err.message ?? "Failed to create event.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Create an Event</h1>
        <p className="text-muted-foreground">
          Fill in the details below — we'll guide you step by step.
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator current={step} />

      {/* Form Card */}
      <Card className="border-gray-800 bg-white/3 backdrop-blur-sm">
        <CardContent className="pt-6 px-6 pb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-0.5">
              {step === 1 && "Event Basics"}
              {step === 2 && "Location Details"}
              {step === 3 && "Capacity & Tickets"}
              {step === 4 && "Review & Publish"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {step === 1 && "Name, description, category, and dates."}
              {step === 2 && "Where is your event happening?"}
              {step === 3 && "How many attendees and ticket pricing?"}
              {step === 4 && "Everything look good? Submit to publish."}
            </p>
          </div>

          {showAIInput ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-600/20 rounded-full text-purple-400">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Describe Your Event Idea</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Just tell us what you're planning (e.g., "A weekend pottery workshop in Delhi for beginners") and we'll fill in the rest!
                </p>
                <Textarea
                  placeholder="Tell the AI what you're dreaming of..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="bg-white/5 border-purple-500/30 focus:border-purple-500 min-h-[120px] mb-4 text-white placeholder:text-gray-500"
                  disabled={isGenerating}
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleAIGenerate}
                    disabled={isGenerating || !aiPrompt.trim()}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        AI is planning...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Plan My Event
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAIInput(false)}
                    disabled={isGenerating}
                  >
                    Manual Mode
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && <StepBasics form={form} onChange={onChange} />}
              {step === 2 && <StepLocation form={form} onChange={onChange} />}
              {step === 3 && <StepCapacity form={form} onChange={onChange} />}
              {step === 4 && <StepReview form={form} />}
            </>
          )}

          {/* Navigation */}
          {!showAIInput && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
            <Button
              id="prev-step-btn"
              type="button"
              variant="ghost"
              onClick={step === 1 ? () => router.push("/explore") : handleBack}
              className="gap-2"
              disabled={submitting}
            >
              <ArrowLeft className="w-4 h-4" />
              {step === 1 ? "Cancel" : "Back"}
            </Button>

            {step < STEPS.length ? (
              <Button
                id="next-step-btn"
                type="button"
                onClick={handleNext}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                id="submit-event-btn"
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing…
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Publish Event
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
      </Card>
    </div>
  );
}
