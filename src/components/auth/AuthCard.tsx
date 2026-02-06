import React from "react";
import { Leaf } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, description, children }) => {
  return (
    <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-xl">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="font-serif text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;
