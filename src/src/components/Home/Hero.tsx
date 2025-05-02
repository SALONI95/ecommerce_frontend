import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="pt-16 bg-[#f5f0eb]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[600px]">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-wider leading-tight">
              WELCOME TO JEWELRY WORLD
            </h1>
            <p className="text-gray-600 max-w-md">
              Our exquisite creation, sparking from timeless jewelry collection that big brands having a fascinating message of love.
            </p>
            <Button className="bg-black text-white hover:bg-black/90 rounded-none px-8">
              Shop Now
            </Button>
          </div>
          <div className="relative aspect-square">
            <img
              src="/placeholder.svg?height=600&width=600"
              alt="Jewelry model"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

