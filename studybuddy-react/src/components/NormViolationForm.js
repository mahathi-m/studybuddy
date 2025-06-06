import { useState } from "react"
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const VIOLATION_TYPES = ["No-show", "Flaky behavior", "Disrespect", "Harassment", "Spam", "Other"]
const ACTIONS = ["Just documenting", "Warning", "Suspension", "Other"]

export default function NormViolationForm() {
  const [violator, setViolator] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [evidence, setEvidence] = useState("")
  const [action, setAction] = useState("")

  const db = getFirestore()
  const auth = getAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    let reporter = "anonymous"
    const user = auth.currentUser
    if (user && user.email) {
      reporter = user.email
    }

    const report = {
      timestamp: serverTimestamp(),
      reportedBy: reporter,
      violator,
      violationType: type,
      description,
      evidenceUrl: evidence,
      desiredAction: action,
    }

    try {
      const reportsRef = collection(db, "normViolations")
      await addDoc(reportsRef, report)

      // reset the form 
      setViolator("")
      setType("")
      setDescription("")
      setEvidence("")
      setAction("")

      alert("thanks for submitting a report! we will get back to you shortly.")
    } catch (err) {
      console.error("something went wrong while trying to submit the report:", err)
      alert("oops, couldn't submit the form. try again?")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold">Norm Violation Report</h2>

      <input value={violator} onChange={(e) => setViolator(e.target.value)} required placeholder="Violator Username" className="w-full p-2 border rounded" />

      <select value={type} onChange={(e) => setType(e.target.value)} required className="w-full p-2 border rounded">
        <option value="">Select Violation Type</option>
        {VIOLATION_TYPES.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>

      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="What happened?" className="w-full p-2 border rounded" />

      <input value={evidence} onChange={(e) => setEvidence(e.target.value)} placeholder="Evidence URL (optional)" className="w-full p-2 border rounded" />

      <select value={action} onChange={(e) => setAction(e.target.value)} required className="w-full p-2 border rounded">
        <option value="">Select Desired Action</option>
        {ACTIONS.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  )
}
