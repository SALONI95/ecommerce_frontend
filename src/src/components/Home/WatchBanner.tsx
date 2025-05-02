import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function WatchBanner() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50">
        <div className="aspect-square relative">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Watch Collection"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6">
            DISCOVER
          </h2>
          <p className="text-gray-600 mb-8">WATCH COLLECTION</p>
          <Button variant="outline" className="bg-white hover:bg-gray-50">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  )
}

