/**
 * User data model interface
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Developer' | 'Tester';
}
