import { promises as fs } from "fs"
import path from "path"
import { randomUUID } from "crypto"
import { mockAccounts, mockGoals, mockInsights, mockTimelineEvents, mockTransactions, mockUser } from "@/lib/mock-data"

const DATA_FILE = path.join(process.cwd(), "data", "app-data.json")

export type AppUser = {
  id: string
  name: string
  email: string
  password: string
  phone?: string
  createdAt: string
}

type Session = {
  token: string
  userId: string
  createdAt: string
}

type Activity = {
  id: string
  type: string
  description?: string
  device: string
  location: string
  timestamp: string
  status: string
}

type Device = {
  id: string
  name: string
  type: "mobile" | "desktop"
  lastActive: string
  isCurrent: boolean
  trustScore: number
}

type StoredAccount = {
  id: string
  name: string
  type: string
  balance: number
  currency: string
  color?: string
  userId?: string
}

type StoredTransaction = {
  id: string
  amount: number
  currency: string
  type: string
  status: string
  description: string
  merchant?: string
  category: string
  date: string | Date
  accountId: string
  metadata?: Record<string, unknown>
  userId?: string
}

type StoredGoal = {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  currency: string
  deadline?: string | Date | null
  color: string
  icon: string
  contributions: unknown[]
  userId?: string
}

type StoredInsight = {
  id: string
  type: string
  title: string
  description: string
  explanation: string
  createdAt: string | Date
  isActionable: boolean
  feedback?: "helpful" | "not_helpful" | null
}

type StoredTimelineEvent = {
  id: string
  type: string
  date: string | Date
  title: string
  description: string
  amount?: number
  isPast: boolean
  isFuture: boolean
}

type AppData = {
  users: AppUser[]
  sessions: Session[]
  accounts: StoredAccount[]
  transactions: StoredTransaction[]
  goals: StoredGoal[]
  insights: StoredInsight[]
  timelineEvents: StoredTimelineEvent[]
  activities: Activity[]
  devices: Device[]
}

function serializeDates<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function defaultData(): AppData {
  return {
    users: [
      {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        password: "demo-password",
        createdAt: mockUser.createdAt.toISOString(),
      },
    ],
    sessions: [],
    accounts: serializeDates(mockAccounts),
    transactions: serializeDates(mockTransactions),
    goals: serializeDates(mockGoals),
    insights: serializeDates(mockInsights),
    timelineEvents: serializeDates(mockTimelineEvents),
    activities: [
      {
        id: "act_001",
        type: "login",
        device: "Browser",
        location: "Local",
        timestamp: new Date().toISOString(),
        status: "success",
      },
    ],
    devices: [
      {
        id: "dev_001",
        name: "Browser Session",
        type: "desktop",
        lastActive: new Date().toISOString(),
        isCurrent: true,
        trustScore: 95,
      },
    ],
  }
}

export async function readData(): Promise<AppData> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8")
    return JSON.parse(raw) as AppData
  } catch {
    const seed = defaultData()
    await writeData(seed)
    return seed
  }
}

export async function writeData(data: AppData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8")
}

export async function createSession(userId: string): Promise<string> {
  const data = await readData()
  const token = randomUUID()
  data.sessions = data.sessions.filter((session) => session.userId !== userId)
  data.sessions.push({ token, userId, createdAt: new Date().toISOString() })
  await writeData(data)
  return token
}

export async function getUserBySession(token: string | undefined): Promise<AppUser | null> {
  if (!token) return null
  const data = await readData()
  const session = data.sessions.find((item) => item.token === token)
  if (!session) return null
  return data.users.find((user) => user.id === session.userId) ?? null
}

export async function destroySession(token: string | undefined): Promise<void> {
  if (!token) return
  const data = await readData()
  data.sessions = data.sessions.filter((item) => item.token !== token)
  await writeData(data)
}

export async function appendTransaction(transaction: StoredTransaction): Promise<void> {
  const data = await readData()
  data.transactions.unshift(transaction)
  data.timelineEvents.unshift({
    id: String(transaction.id),
    type: "transaction",
    date: transaction.date,
    title: String(transaction.description ?? "Transaction"),
    description: String(transaction.merchant ?? ""),
    amount: Number(transaction.type === "credit" ? transaction.amount : -Number(transaction.amount ?? 0)),
    isPast: true,
    isFuture: false,
  })
  await writeData(data)
}

export async function addActivity(activity: Activity): Promise<void> {
  const data = await readData()
  data.activities.unshift(activity)
  await writeData(data)
}

export async function addUser(user: AppUser): Promise<void> {
  const data = await readData()
  data.users.push(user)
  data.accounts.push({
    id: `acc_${user.id}`,
    name: "Main Account",
    type: "checking",
    balance: 0,
    currency: "USD",
    color: "#FAFF00",
    userId: user.id,
  })
  await writeData(data)
}

export async function setInsightFeedback(id: string, feedback: "helpful" | "not_helpful"): Promise<boolean> {
  const data = await readData()
  const insight = data.insights.find((item) => item.id === id)
  if (!insight) return false
  insight.feedback = feedback
  await writeData(data)
  return true
}
