"use client";

import { useState, useEffect } from "react";
import { Mic, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Slider } from "@/app/components/ui/slider";

import AddyAvatar from "../../../../../assets/illustrations/addy-avatar.png";

export default function VoiceVerification() {
  const [volume, setVolume] = useState(76);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);

  // Simulate the audio visualization
  const [audioValues, setAudioValues] = useState(Array(10).fill(0));

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAudioValues(audioValues.map(() => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRecording, audioValues]);

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setIsProcessing(false);
    } else {
      setTimeout(() => setIsProcessing(true), 1000);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border/30 bg-card shadow-lg backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full blur-md transition-opacity",
                isRecording ? "animate-pulse bg-primary/30" : "bg-primary/10",
              )}
            />
            <Avatar className="relative z-10 h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={AddyAvatar.src} alt="Profile" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>

        <div className="my-2 flex h-12 items-end gap-1">
          {audioValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ height: "10%" }}
              animate={{
                height: `${isRecording ? value : 10 + (index % 3) * 10}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                duration: 0.1,
              }}
              className="w-1.5 rounded-full bg-primary"
              style={{
                opacity: isRecording ? 1 : 0.6 + (index % 5) * 0.1,
              }}
            />
          ))}
        </div>

        <div className="w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-border/20 bg-background/50 px-4 py-3 text-center text-sm text-muted-foreground"
          >
            {isProcessing
              ? "Addy is securely reviewing your information. This may take a moment as our system verifies your documents and details."
              : isRecording
                ? "Please speak clearly into the microphone..."
                : "Click the microphone button to begin verification."}
          </motion.p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/20 bg-muted/30 p-4">
        <div className="flex w-1/2 items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0] ?? 0)}
            className="w-full"
          />
          <span className="min-w-8 text-xs text-muted-foreground">
            {volume}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                English <span className="ml-1 opacity-60">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>Deutsch</DropdownMenuItem>
              <DropdownMenuItem>日本語</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              size="icon"
              variant={isRecording ? "destructive" : "default"}
              className={cn(
                "h-12 w-12 rounded-full transition-all",
                isRecording && "animate-pulse",
              )}
              onClick={handleMicClick}
            >
              <Mic className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
