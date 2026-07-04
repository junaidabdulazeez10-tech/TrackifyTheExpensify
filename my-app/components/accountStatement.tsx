export default function AccountStatement() {
  return (
    <>
      <div className="flex justify-between border mt-2 p-5">
        <div className="flex gap-2">
          <div>Logo</div>
          <div className="flex flex-col">
            <div>Monthly Salary</div>
            <div><span>Jun 1</span> <span>Income</span></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>+$3434</div>
          <div>Income</div>
        </div>
      </div>
    </>
  )
}