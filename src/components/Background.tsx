/** Fixed aurora field behind the whole page. Pure CSS, no JS per frame. */
export function Background() {
  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-[30%] left-[-10%] h-[80vh] w-[70vw] rounded-full opacity-[0.22] blur-[120px] animate-drift"
        style={{ background: 'radial-gradient(closest-side, #a855f7, transparent)' }}
      />
      <div
        className="absolute top-[10%] right-[-15%] h-[70vh] w-[60vw] rounded-full opacity-[0.16] blur-[120px] animate-drift"
        style={{ background: 'radial-gradient(closest-side, #38bdf8, transparent)', animationDelay: '-8s' }}
      />
      <div
        className="absolute bottom-[-30%] left-[20%] h-[70vh] w-[60vw] rounded-full opacity-[0.12] blur-[140px] animate-drift"
        style={{ background: 'radial-gradient(closest-side, #6366f1, transparent)', animationDelay: '-15s' }}
      />
      {/* Faint star dust */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 12% 18%, #f5f7ff 50%, transparent 51%), radial-gradient(1px 1px at 78% 12%, #f5f7ff 50%, transparent 51%), radial-gradient(1px 1px at 36% 66%, #c7cbe6 50%, transparent 51%), radial-gradient(1px 1px at 88% 72%, #c7cbe6 50%, transparent 51%), radial-gradient(1px 1px at 58% 38%, #f5f7ff 50%, transparent 51%), radial-gradient(1px 1px at 22% 88%, #8a90b4 50%, transparent 51%), radial-gradient(1px 1px at 66% 92%, #8a90b4 50%, transparent 51%)',
          backgroundSize: '900px 900px',
        }}
      />
    </div>
  )
}
