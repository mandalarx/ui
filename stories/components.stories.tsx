import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Bell, Check, ChevronsUpDown, Info, Plus, Search, Settings, Trash2 } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function ComponentShowcase() {
  return <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
    <Card><CardHeader><CardTitle>Actions</CardTitle><CardDescription>Clear hierarchy across routine and consequential actions.</CardDescription></CardHeader><CardContent className="flex flex-wrap items-center gap-3"><Button><Plus />Create</Button><Button variant="secondary"><Settings />Configure</Button><Button variant="outline">Preview</Button><Button variant="ghost">Dismiss</Button><Button variant="destructive"><Trash2 />Delete</Button><Tooltip><TooltipTrigger asChild><Button size="icon" variant="outline" aria-label="Notifications"><Bell /></Button></TooltipTrigger><TooltipContent>Notifications</TooltipContent></Tooltip></CardContent><CardFooter className="gap-2"><Badge>Active</Badge><Badge variant="secondary">Draft</Badge><Badge variant="outline">Archived</Badge><Badge variant="destructive">Blocked</Badge></CardFooter></Card>
    <Card><CardHeader><CardTitle>Form controls</CardTitle><CardDescription>Balanced 36px controls with strong focus and validation states.</CardDescription></CardHeader><CardContent className="space-y-5"><div className="space-y-2"><Label htmlFor="search">Search</Label><div className="relative"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input id="search" className="pl-9" placeholder="Search components…" /></div></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label>Category</Label><Select defaultValue="forms"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="forms">Forms</SelectItem><SelectItem value="navigation">Navigation</SelectItem><SelectItem value="feedback">Feedback</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label htmlFor="notes">Notes</Label><Textarea id="notes" placeholder="Usage guidance" /></div></div><Slider defaultValue={[62]} /><div className="flex flex-wrap gap-6"><label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked />Include examples</label><label className="flex items-center gap-2 text-sm"><Switch defaultChecked />Publish changes</label></div><RadioGroup defaultValue="balanced" className="grid-cols-3"><label className="flex items-center gap-2 text-sm"><RadioGroupItem value="compact" />Compact</label><label className="flex items-center gap-2 text-sm"><RadioGroupItem value="balanced" />Balanced</label><label className="flex items-center gap-2 text-sm"><RadioGroupItem value="spacious" />Spacious</label></RadioGroup></CardContent></Card>
    <Card><CardHeader><CardTitle>Disclosure & overlays</CardTitle><CardDescription>Motion reinforces origin, depth, and state.</CardDescription></CardHeader><CardContent><Accordion type="single" collapsible defaultValue="motion"><AccordionItem value="motion"><AccordionTrigger>How does motion behave?</AccordionTrigger><AccordionContent>Controls respond in 120–200ms; larger entrances use up to 340ms and respect reduced motion.</AccordionContent></AccordionItem><AccordionItem value="themes"><AccordionTrigger>Are both themes supported?</AccordionTrigger><AccordionContent>Every semantic token has coordinated light and dark values.</AccordionContent></AccordionItem></Accordion><div className="mt-5 flex gap-3"><Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Publish token update?</DialogTitle><DialogDescription>This makes the revised violet scale available to every component.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline">Cancel</Button><Button>Publish</Button></DialogFooter></DialogContent></Dialog><Popover><PopoverTrigger asChild><Button variant="outline"><ChevronsUpDown />Details</Button></PopoverTrigger><PopoverContent><PopoverHeader><PopoverTitle>Semantic tokens</PopoverTitle><PopoverDescription>Components consume roles such as primary, muted, border, and ring.</PopoverDescription></PopoverHeader></PopoverContent></Popover></div></CardContent></Card>
    <Card><CardHeader><CardTitle>Data & feedback</CardTitle><CardDescription>Readable density for operational interfaces.</CardDescription></CardHeader><CardContent className="space-y-5"><Alert><Info /><AlertTitle>Registry synchronized</AlertTitle><AlertDescription>61 components and 97 blocks match the recorded snapshot.</AlertDescription></Alert><Tabs defaultValue="coverage"><TabsList><TabsTrigger value="coverage">Coverage</TabsTrigger><TabsTrigger value="people">Reviewers</TabsTrigger></TabsList><TabsContent value="coverage" className="pt-4"><Progress value={100} /><Table className="mt-4"><TableHeader><TableRow><TableHead>Area</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Components</TableCell><TableCell><Badge variant="secondary"><Check />Complete</Badge></TableCell></TableRow><TableRow><TableCell>Blocks</TableCell><TableCell><Badge variant="secondary"><Check />Archived</Badge></TableCell></TableRow></TableBody></Table></TabsContent><TabsContent value="people" className="flex items-center gap-3 pt-4"><Avatar><AvatarFallback>DS</AvatarFallback></Avatar><div><p className="text-sm font-medium">Design systems</p><p className="text-xs text-muted-foreground">Ready for review</p></div></TabsContent></Tabs><div className="space-y-2"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-full" /></div></CardContent></Card>
  </div>
}

const meta = { title: "Components/Showcase", component: ComponentShowcase, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ComponentShowcase>
export default meta
type Story = StoryObj<typeof meta>
export const PrimaryStates: Story = {}
