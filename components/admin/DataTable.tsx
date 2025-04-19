'use client'

import { useEffect, useState } from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Request {
  id: string
  storeOwner: string
  type: 'New Product' | 'Discount Approval' | 'Product Update'
  status: 'Pending' | 'Approved' | 'Rejected'
}

export default function RequestsPage() {
  const [data, setData] = useState<Request[]>([])

  useEffect(() => {
    // replace with your real fetch
    fetch('/api/admin/requests')
      .then(r => r.json())
      .then(setData)
  }, [])

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Store Owner</TableHead>
            <TableHead>Request Type</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(r => (
            <TableRow key={r.id}>
              <TableCell>{r.storeOwner}</TableCell>
              <TableCell>{r.type}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" variant="outline">Accept</Button>
                <Button size="sm" variant="destructive">Reject</Button>
              </TableCell>
              <TableCell>
                <Badge variant={
                  r.status === 'Approved' ? 'default' :
                  r.status === 'Rejected' ? 'destructive' :
                  'secondary'
                }>
                  {r.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
