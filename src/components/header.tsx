export function Header() {
  return (
    <header className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Worldskills_Ghana-fINOXRsGnwZsFN6315sTSxo1zZlRUW.png"
              alt="WorldSkills Ghana Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold">HTU COMPSSA</h1>
              <p className="text-sm text-orange-100">Dues Management System</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
