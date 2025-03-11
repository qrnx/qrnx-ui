import { getUser } from "@/api/users";
import { ClitentRoles } from "@/types/clientRoles";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

// "id": 1,
//   "documentId": "pbusadjojcx13x4o7ss035um",
//   "username": "test",
//   "email": "test@strapi.io",
//   "provider": "local",
//   "confirmed": true,
//   "blocked": false,
//   "maxPolls": 10,
//   "clientRole": "Premium",
//   "createdAt": "2025-03-02T19:00:13.942Z",
//   "updatedAt": "2025-03-06T14:22:04.202Z",
//   "publishedAt": "2025-03-06T14:22:04.177Z"

export interface UserContext extends User {
  isLoading: boolean;
}

const EMPTY_USER: User = {
  id: 0,
  documentId: "",
  username: "",
  email: "",
  provider: "",
  confirmed: false,
  blocked: false,
  maxPolls: 0,
  clientRole: ClitentRoles.PUBLIC,
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  locale: "",
  localizations: [],
};

const UserContext = createContext<UserContext>({
  ...EMPTY_USER,
  isLoading: true,
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const dataToRender = data || EMPTY_USER;

  const value = {
    ...dataToRender,
    isLoading: isPending,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
