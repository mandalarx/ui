import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as UI from "@/components/ui/input-otp"

function Example() {
  
  return <div className="mx-auto w-full max-w-xl space-y-5"><UI.InputOTP maxLength={6} aria-label="Verification code"><UI.InputOTPGroup>{[0, 1, 2].map(index => <UI.InputOTPSlot key={index} index={index} />)}</UI.InputOTPGroup><UI.InputOTPSeparator /><UI.InputOTPGroup>{[3, 4, 5].map(index => <UI.InputOTPSlot key={index} index={index} />)}</UI.InputOTPGroup></UI.InputOTP></div>
}

const meta = { title: "Components/Input Otp", component: Example } satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const States: Story = {}
