import React, { useState } from 'react'

interface TestCase {
  id: string;
  summary: string;
  preConditions: string;
  steps: string;
  expectedResult: string;
  status: string;
  [key: string]: string;
}

interface TestCaseTableProps {
  testCases: TestCase[];
  onUpdate: (cases: TestCase[]) => void;
}

export default function TestCaseTable({ testCases, onUpdate }: TestCaseTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<TestCase>>({});

  const handleEdit = (testCase: TestCase) => {
    setEditingId(testCase.id);
    setEditValues(testCase);
  };

  const handleSave = () => {
    const updated = testCases.map(tc => 
      tc.id === editingId ? { ...tc, ...editValues } : tc
    );
    onUpdate(updated);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    onUpdate(testCases.filter(tc => tc.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  return (
    <div className="test-case-table-container">
      <table className="test-case-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Summary</th>
            <th>Pre-Conditions</th>
            <th>Steps</th>
            <th>Expected Result</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map((tc) => (
            <tr key={tc.id} className={editingId === tc.id ? 'editing' : ''}>
              <td>{tc.id}</td>
              <td>
                {editingId === tc.id ? (
                  <input 
                    value={editValues.summary || ''} 
                    onChange={(e) => setEditValues({...editValues, summary: e.target.value})}
                  />
                ) : tc.summary}
              </td>
              <td>
                {editingId === tc.id ? (
                  <input 
                    value={editValues.preConditions || ''} 
                    onChange={(e) => setEditValues({...editValues, preConditions: e.target.value})}
                  />
                ) : tc.preConditions}
              </td>
              <td>
                {editingId === tc.id ? (
                  <input 
                    value={editValues.steps || ''} 
                    onChange={(e) => setEditValues({...editValues, steps: e.target.value})}
                  />
                ) : tc.steps}
              </td>
              <td>
                {editingId === tc.id ? (
                  <input 
                    value={editValues.expectedResult || ''} 
                    onChange={(e) => setEditValues({...editValues, expectedResult: e.target.value})}
                  />
                ) : tc.expectedResult}
              </td>
              <td>
                {editingId === tc.id ? (
                  <select 
                    value={editValues.status || ''} 
                    onChange={(e) => setEditValues({...editValues, status: e.target.value})}
                  >
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                ) : tc.status}
              </td>
              <td className="actions">
                {editingId === tc.id ? (
                  <>
                    <button onClick={handleSave} className="btn-small btn-save">✓</button>
                    <button onClick={handleCancel} className="btn-small btn-cancel">✕</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(tc)} className="btn-small btn-edit">✎</button>
                    <button onClick={() => handleDelete(tc.id)} className="btn-small btn-delete">🗑</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
