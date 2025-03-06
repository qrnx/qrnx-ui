"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { SubscriptionStatus } from "./subscription-status";
import { useTranslations } from "next-intl";
import { DeletePremium } from "./forms/delete-premium";

export function UserNav() {
  const { data: session, status } = useSession();
  const t = useTranslations("userNav");

  const personalProgram = true;

  if (status === "loading") {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  if (!session) {
    return (
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Link href={ROUTES.signIn}>
          <Avatar className="h-8 w-8">
            <AvatarImage alt="User" />
            <AvatarFallback>
              <LogIn height={24} width={24} />
            </AvatarFallback>
          </Avatar>
        </Link>
      </Button>
    );
  }

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session.user?.image ?? ""}
                alt={session.user?.name ?? ""}
              />
              <AvatarFallback>
                <User height={24} width={24} />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SubscriptionStatus
            deleteComponent={<DeletePremium />}
            hasSubscription={personalProgram}
          />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: ROUTES.home })}
          >
            {t("logOut")}
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
