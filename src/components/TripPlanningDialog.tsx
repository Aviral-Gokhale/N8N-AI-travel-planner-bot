import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const currencies = [
  { value: "INR", label: "INR" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "CAD", label: "CAD" },
  { value: "AUD", label: "AUD" },
  { value: "JPY", label: "JPY" },
  { value: "CHF", label: "CHF" },
  { value: "SEK", label: "SEK" },
  { value: "NOK", label: "NOK" },
  { value: "DKK", label: "DKK" },
];

const transportationOptions = [
  { value: "flight", label: "Flight" },
  { value: "car", label: "Car" },
  { value: "train", label: "Train" },
  { value: "bus", label: "Bus" },
  { value: "cruise", label: "Cruise" },
  { value: "mixed", label: "Mixed" },
];

const numberOptions = Array.from({ length: 6 }, (_, i) => ({
  value: (i + 1).toString(),
  label: i === 5 ? "6+" : (i + 1).toString(),
}));

const zeroNumberOptions = [
  { value: "0", label: "0" },
  ...Array.from({ length: 5 }, (_, i) => ({
    value: (i + 1).toString(),
    label: i === 4 ? "5+" : (i + 1).toString(),
  })),
];

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  origin: z.string().min(1, "Starting location is required"),
  destination: z.string().min(1, "Destination is required"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  adults: z.string().min(1, "Number of adults is required"),
  children: z.string(),
  seniors: z.string(),
  currency: z.string().min(1, "Currency is required"),
  amount: z.number().min(1, "Budget amount is required"),
  transportation: z.string().min(1, "Transportation preference is required"),
  interests: z.string().optional(),
  specialRequests: z.string().optional(),
}).refine((data) => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

type FormData = z.infer<typeof formSchema>;

interface TripPlanningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TripPlanningDialog({ open, onOpenChange }: TripPlanningDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      origin: "",
      destination: "",
      adults: "1",
      children: "0",
      seniors: "0",
      currency: "INR",
      amount: 0,
      transportation: "",
      interests: "",
      specialRequests: "",
    },
  });

  const calculateDuration = (startDate: Date, endDate: Date) => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return {
      days,
      nights: Math.max(0, days - 1),
    };
  };

  const calculateBudgetBreakdown = (total: number, totalTravellers: number, days: number) => {
    const perPerson = totalTravellers > 0 ? total / totalTravellers : 0;
    const perDay = days > 0 ? total / days : 0;
    
    return {
      perPerson: Math.round(perPerson * 100) / 100,
      perDay: Math.round(perDay * 100) / 100,
    };
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const requestId = uuidv4();
      const submitTime = new Date().toISOString();
      
      const totalTravellers = parseInt(data.adults) + parseInt(data.children) + parseInt(data.seniors);
      const duration = calculateDuration(data.startDate, data.endDate);
      const budgetBreakdown = calculateBudgetBreakdown(data.amount, totalTravellers, duration.days);
      
      const interests = data.interests 
        ? data.interests.split(',').map(interest => interest.trim()).filter(Boolean)
        : [];

      const payload = {
        requestId,
        timestamp: submitTime,
        trip: {
          email: data.email,
          origin: data.origin,
          destination: data.destination,
          dates: {
            startDate: format(data.startDate, "yyyy-MM-dd"),
            endDate: format(data.endDate, "yyyy-MM-dd"),
            duration,
          },
        },
        travellers: {
          total: totalTravellers,
          breakdown: {
            adults: parseInt(data.adults),
            children: parseInt(data.children),
            seniors: parseInt(data.seniors),
          },
        },
        budget: {
          total: {
            amount: data.amount,
            currency: data.currency,
          },
          perPerson: {
            amount: budgetBreakdown.perPerson,
            currency: data.currency,
          },
          perDay: {
            amount: budgetBreakdown.perDay,
            currency: data.currency,
          },
        },
        preferences: {
          transportation: data.transportation,
          interests,
          specialRequests: data.specialRequests || "",
        },
        metadata: {
          source: "travel-planner-web",
          userAgent: navigator.userAgent,
          submitTime,
        },
      };

      // Here you would send to your webhook
      // For now, we'll just simulate success
      console.log("Webhook payload:", JSON.stringify(payload, null, 2));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Planning Request Submitted!",
        description: "Your AI travel planner is working on your personalised itinerary. You'll be contacted soon!",
      });
      
      form.reset();
      onOpenChange(false);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Plan Your Perfect Trip
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your.email@example.com" 
                      type="email"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Origin and Destination */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Starting From</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., New York, London" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where would you like to go?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris, Tokyo, Bali" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Number of Travellers */}
            <div>
              <FormLabel className="text-base font-semibold">Number of Travellers</FormLabel>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Adults</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {numberOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="children"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Children</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {zeroNumberOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seniors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Seniors</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {zeroNumberOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <FormLabel className="text-base font-semibold">Budget</FormLabel>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Total Budget</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="5000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Transportation */}
            <FormField
              control={form.control}
              name="transportation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Transportation</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transportation preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transportationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Interests */}
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., Museums, Food tours, Adventure sports, Shopping"
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Separate multiple interests with commas
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Special Requests */}
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any dietary requirements, accessibility needs, or special occasions?"
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="hero"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Your Plan..." : "Create My Itinerary"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}