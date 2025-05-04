"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { Calendar, Car, Clock, Download, FileText, Plus, RefreshCw, Shield, Star } from "lucide-react"
import Badge from "../components/ui/Badge"

interface InsuranceProps {
  selectedVehicle: Vehicle
}

const mockVehicles = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    licensePlate: "ABC-123",
    image: "/toyota-camry.jpg",
  },
]

const Insurance: React.FC<InsuranceProps> = ({ selectedVehicle = mockVehicles[0] }) => {
  // State for insurance policy
  const [insurancePolicy] = useState({
    provider: "SafeDrive Insurance",
    policyNumber: "PL-12345678",
    coverageType: "Comprehensive",
    startDate: new Date(2023, 0, 15),
    endDate: new Date(2024, 0, 15),
    premium: 1250,
    deductible: 500,
    driverScore: 92,
    discounts: ["Safe Driver", "Multi-Vehicle", "Telematics"],
    coverages: [
      {
        type: "Liability",
        limit: "250,000/500,000",
        description: "Bodily injury and property damage liability coverage",
      },
      {
        type: "Collision",
        limit: "Full Coverage",
        description: "Covers damage to your vehicle from an accident",
      },
      {
        type: "Comprehensive",
        limit: "Full Coverage",
        description: "Covers damage to your vehicle not caused by a collision",
      },
      {
        type: "Medical Payments",
        limit: "10,000",
        description: "Covers medical expenses for you and your passengers",
      },
      {
        type: "Uninsured Motorist",
        limit: "250,000/500,000",
        description: "Covers damages caused by an uninsured driver",
      },
    ],
    claims: [
      {
        id: "CL-001",
        date: new Date(2023, 3, 12),
        type: "Collision",
        status: "Closed",
        amount: 3200,
        description: "Rear-end collision at intersection",
      },
      {
        id: "CL-002",
        date: new Date(2023, 8, 5),
        type: "Comprehensive",
        status: "Open",
        amount: 1800,
        description: "Hail damage to vehicle",
      },
    ],
  })

  // State for usage-based insurance data
  const [usageData] = useState({
    milesDriven: 8750,
    avgMilesPerMonth: 730,
    hardBraking: 12,
    hardAcceleration: 8,
    nightDriving: "15%",
    speedingEvents: 5,
    potentialSavings: 210,
  })

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Calculate days until renewal
  const getDaysUntilRenewal = () => {
    const today = new Date()
    const endDate = new Date(insurancePolicy.endDate)
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Open":
        return "warning"
      case "Closed":
        return "success"
      case "Denied":
        return "danger"
      default:
        return "default"
    }
  }

  // Download policy documents
  const downloadPolicyDocuments = () => {
    // In a real app, this would download policy documents
    alert("Downloading policy documents...")
  }

  // File a new claim
  const fileNewClaim = () => {
    // In a real app, this would open a form to file a new claim
    alert("Opening new claim form...")
  }

  // Refresh driver score
  const refreshDriverScore = () => {
    // In a real app, this would refresh the driver score
    alert("Refreshing driver score...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Insurance</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" leftIcon={<FileText size={16} />} onClick={fileNewClaim}>
            File Claim
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Download size={16} />} onClick={downloadPolicyDocuments}>
            Download Documents
          </Button>
        </div>
      </div>

      {/* Policy Overview */}
      <Card title="Policy Overview">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{insurancePolicy.provider}</h3>
                <p className="text-sm text-gray-500">Policy #{insurancePolicy.policyNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Coverage Type</div>
                <div className="text-base font-medium">{insurancePolicy.coverageType}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Annual Premium</div>
                <div className="text-base font-medium">${insurancePolicy.premium}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Deductible</div>
                <div className="text-base font-medium">${insurancePolicy.deductible}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Driver Score</div>
                <div className="flex items-center">
                  <div className="text-base font-medium mr-2">{insurancePolicy.driverScore}</div>
                  <Badge variant="success" size="sm">
                    Excellent
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg w-full md:w-auto">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Policy Period</div>
              <div className="text-base font-medium">
                {formatDate(insurancePolicy.startDate)} - {formatDate(insurancePolicy.endDate)}
              </div>
              <div className="mt-3 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm">
                  <strong>{getDaysUntilRenewal()}</strong> days until renewal
                </span>
              </div>
              <Button variant="outline" size="sm" className="mt-3">
                Renew Policy
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Vehicle Information */}
      <Card title="Insured Vehicle">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center">
            <img
              src={selectedVehicle?.image || "/placeholder.svg?height=200&width=300"}
              alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
              className="w-24 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="text-lg font-medium">
                {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </h3>
              <p className="text-sm text-gray-500">VIN: {"1HGCM82633A123456"}</p>
              <p className="text-sm text-gray-500">License Plate: {selectedVehicle.licensePlate}</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Primary Driver</div>
              <div className="text-base font-medium">John Doe</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Annual Mileage</div>
              <div className="text-base font-medium">12,000 miles</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Garage Address</div>
              <div className="text-base font-medium">123 Main St, San Francisco, CA</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Coverage Details */}
      <Card title="Coverage Details">
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Coverage Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Limit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {insurancePolicy.coverages.map((coverage, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coverage.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${coverage.limit}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{coverage.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Shield className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Additional Benefits</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Roadside Assistance</li>
                    <li>Rental Car Coverage</li>
                    <li>Glass Repair</li>
                    <li>Trip Interruption Coverage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Claims History */}
      <Card title="Claims History">
        <div className="space-y-4">
          {insurancePolicy.claims.length > 0 ? (
            <div className="space-y-4">
              {insurancePolicy.claims.map((claim) => (
                <div key={claim.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">Claim #{claim.id}</h3>
                      <p className="text-sm text-gray-500">{formatDate(claim.date)}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(claim.status)} size="lg">
                      {claim.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Type</div>
                      <div className="text-base font-medium">{claim.type}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-1">Amount</div>
                      <div className="text-base font-medium">${claim.amount.toLocaleString()}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Description</div>
                    <div className="text-base">{claim.description}</div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <h3 className="text-lg font-medium text-gray-800">No Claims Filed</h3>
              <p className="text-gray-500 mt-1">You haven't filed any insurance claims yet.</p>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={fileNewClaim}>
              File New Claim
            </Button>
          </div>
        </div>
      </Card>

      {/* Usage-Based Insurance */}
      <Card title="Usage-Based Insurance">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Driver Score</h3>
              <p className="text-sm text-gray-500">Based on your driving habits over the last 30 days</p>
            </div>
            <Button variant="outline" size="sm" leftIcon={<RefreshCw size={16} />} onClick={refreshDriverScore}>
              Refresh Score
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${insurancePolicy.driverScore * 2.83} 283`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                {/* Score text */}
                <text x="50" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="bold">
                  {insurancePolicy.driverScore}
                </text>
                <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#6b7280">
                  SCORE
                </text>
              </svg>

              <div className="absolute top-0 right-0">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(insurancePolicy.driverScore / 20) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Miles Driven</div>
                <div className="text-base font-medium">{usageData.milesDriven.toLocaleString()} miles</div>
                <div className="text-xs text-gray-500">{usageData.avgMilesPerMonth} miles/month</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Hard Braking</div>
                <div className="text-base font-medium">{usageData.hardBraking} events</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Hard Acceleration</div>
                <div className="text-base font-medium">{usageData.hardAcceleration} events</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Night Driving</div>
                <div className="text-base font-medium">{usageData.nightDriving}</div>
                <div className="text-xs text-gray-500">of total driving time</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Speeding Events</div>
                <div className="text-base font-medium">{usageData.speedingEvents} events</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Potential Savings</div>
                <div className="text-base font-medium text-green-600">${usageData.potentialSavings}/year</div>
                <div className="text-xs text-gray-500">based on current score</div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Car className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Safe Driving Tips</h3>
                <div className="mt-2 text-sm text-green-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Avoid hard braking by maintaining a safe following distance</li>
                    <li>Accelerate gradually to improve your score and fuel efficiency</li>
                    <li>Observe speed limits to avoid speeding events</li>
                    <li>Plan trips during daylight hours when possible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Discounts */}
      <Card title="Available Discounts">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            You're currently receiving the following discounts on your insurance premium.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Shield className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-md font-medium">Safe Driver</h3>
              </div>
              <p className="text-sm text-gray-600">15% discount for maintaining a clean driving record</p>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Car className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-md font-medium">Multi-Vehicle</h3>
              </div>
              <p className="text-sm text-gray-600">10% discount for insuring multiple vehicles</p>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-md font-medium">Telematics</h3>
              </div>
              <p className="text-sm text-gray-600">Up to 20% discount based on your driving habits</p>
            </div>
          </div>

          <div className="mt-4">
            <Button variant="outline" size="sm">
              View All Available Discounts
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Insurance
