import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <Avatar className="h-8 w-8 rounded-full">
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
    </Avatar>
  );
}
