export function About() {
  return (
    <section className="bg-[#2C2C2C] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square">
            <img
              src="./src/assets/hero2.jpg"
              alt="Jewelry craftsmanship"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-6 max-w-lg">
            <h2 className="text-sm tracking-wider mb-4">
              LOOMINA ABOUT - BETTER BY DESIGN
            </h2>
            <p className="text-gray-300">
              Loomina creates handcrafted, handmade jewelry with your happiness
              in mind, conscientiously.
            </p>
            <p className="text-gray-300">
              We believe that luxury and customer satisfaction can coexist which
              is why our skilled artisans use only the finest, ethically sourced
              18-carat diamonds, gemstones, and the soft gold to produce our
              signature pieces.
            </p>
            <p className="text-gray-300">
              By committing to these sustainable and traceable practices, we aim
              to set standards of conscious design, crafting, and living.
            </p>
            <a
              href="/collections"
              className="inline-block text-white hover:text-gray-300 mt-4"
            >
              View collections →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
