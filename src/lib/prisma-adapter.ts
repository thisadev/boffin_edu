import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter, AdapterUser, AdapterAccount } from "next-auth/adapters";

/**
 * Custom Prisma Adapter that ensures proper ID type handling
 * This adapter converts string IDs to integers when needed for database operations
 */
export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  // Get the original adapter
  const originalAdapter = PrismaAdapter(prisma) as Required<Adapter>;
  
  // Return a modified adapter that handles ID type conversions
  return {
    ...originalAdapter,
    // Override methods that need ID conversion
    async getUser(id: string): Promise<AdapterUser | null> {
      try {
        // Convert string ID to integer for database query
        const userId = parseInt(id, 10);
        if (isNaN(userId)) return null;
        
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        
        if (!user) return null;
        
        // Convert the numeric ID to string to match AdapterUser type
        return {
          ...user,
          id: user.id.toString(),
        } as AdapterUser;
      } catch (error) {
        console.error("Error in custom getUser adapter:", error);
        return null;
      }
    },
    
    async getUserByAccount(providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">): Promise<AdapterUser | null> {
      try {
        const account = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: providerAccountId.provider,
              providerAccountId: providerAccountId.providerAccountId,
            },
          },
          include: { user: true },
        });
        
        if (!account?.user) return null;
        
        // Convert the numeric ID to string to match AdapterUser type
        return {
          ...account.user,
          id: account.user.id.toString(),
        } as AdapterUser;
      } catch (error) {
        console.error("Error in custom getUserByAccount adapter:", error);
        return null;
      }
    },
    
    // Create a user and ensure ID is converted to string
    async createUser(userData: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      try {
        const user = await prisma.user.create({
          data: userData as any,
        });
        
        return {
          ...user,
          id: user.id.toString(),
        } as AdapterUser;
      } catch (error) {
        console.error("Error in custom createUser adapter:", error);
        throw error;
      }
    },
    
    // Handle ID conversion for user updates
    async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Promise<AdapterUser> {
      try {
        // Convert string ID to integer for database operations
        const userId = parseInt(user.id, 10);
        if (isNaN(userId)) {
          throw new Error(`Invalid user ID: ${user.id}`);
        }
        
        // Create a new user object without the id field for the update
        const { id, ...userData } = user;
        
        // Update the user with the integer ID
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: userData as any,
        });
        
        // Convert the numeric ID back to string for the return value
        return {
          ...updatedUser,
          id: updatedUser.id.toString(),
        } as AdapterUser;
      } catch (error) {
        console.error("Error in custom updateUser adapter:", error);
        throw error;
      }
    },
    
    // Override linkAccount to handle ID conversion
    async linkAccount(account: AdapterAccount): Promise<AdapterAccount> {
      try {
        // Convert string userId to integer
        const userId = parseInt(account.userId, 10);
        if (isNaN(userId)) {
          throw new Error(`Invalid user ID: ${account.userId}`);
        }
        
        // Create the account with the integer userId
        const result = await prisma.account.create({
          data: {
            ...account,
            userId,
          },
        });
        
        // Convert the userId back to string for the return value
        return {
          ...result,
          userId: result.userId.toString(),
        } as AdapterAccount;
      } catch (error) {
        console.error("Error in custom linkAccount adapter:", error);
        throw error;
      }
    },
  };
}
