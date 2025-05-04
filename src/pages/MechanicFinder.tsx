"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import { mockMechanicServices } from "../data/mockData"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import { MapPin, Phone, Clock, Star, Filter, X, Search, Calendar, PenToolIcon as Tool } from "lucide-react"

interface MechanicFinderProps {
  selectedVehicle: Vehicle
}

const MechanicFinder: React.FC<MechanicFinderProps> = ({ selectedVehicle }) => {
  // State for filters
  const [filters, setFilters] = useState({
    distance: "all", // 'all', '5', '10', '25'
    rating: "all", // 'all', '4', '3'
    specialty: "all", // 'all', 'Electric Vehicles', 'Hybrid Vehicles', etc.
  })

  // State for search
  const [searchQuery, setSearchQuery] = useState("")

  // Apply filters and search
  const filteredServices = mockMechanicServices.filter((service) => {
    // Distance filter
    if (filters.distance !== "all") {
      const maxDistance = Number.parseInt(filters.distance)
      if (service.distance > maxDistance) return false
    }

    // Rating filter
    if (filters.rating !== "all") {
      const minRating = Number.parseInt(filters.rating)
      if (service.rating < minRating) return false
    }

    // Specialty filter
    if (filters.specialty !== "all" && !service.specialties.includes(filters.specialty)) {
      return false
    }

    // Search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        service.name.toLowerCase().includes(query) ||
        service.address.toLowerCase().includes(query) ||
        service.specialties.some((s) => s.toLowerCase().includes(query))
      )
    }

    return true
  })

  // Sort by distance
  const sortedServices = [...filteredServices].sort((a, b) => a.distance - b.distance)

  // Clear filters
  const clearFilters = () => {
    setFilters({
      distance: "all",
      rating: "all",
      specialty: "all",
    })
    setSearchQuery("")
  }

  // Format rating as stars
  const formatRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {halfStar && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    )
  }

  // Get all unique specialties
  const allSpecialties = Array.from(new Set(mockMechanicServices.flatMap((service) => service.specialties)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Mechanic Finder</h1>
        <Button variant="primary" size="sm" leftIcon={<Calendar size={16} />}>
          Schedule Service
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, address, or specialty..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium">Filters</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.distance}
                onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
              >
                <option value="all">All Distances</option>
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
              </select>

              <select
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
              >
                <option value="all">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
              </select>

              <select
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.specialty}
                onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>

              <Button variant="outline" size="sm" onClick={clearFilters} leftIcon={<X size={16} />}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Map View (Placeholder) */}
      <Card title="Nearby Mechanics">
        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Map would display here</p>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-2">
          Showing {sortedServices.length} mechanics near {selectedVehicle.location?.address || "your location"}
        </div>
      </Card>

      {/* Mechanic List */}
      <div className="space-y-4">
        {sortedServices.length > 0 ? (
          sortedServices.map((service) => (
            <Card key={service.id}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/4">
                  <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                    <Tool className="w-12 h-12 text-gray-400" />
                  </div>
                </div>

                <div className="md:w-3/4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{service.name}</h3>
                    <div className="flex items-center mt-1 sm:mt-0">{formatRating(service.rating)}</div>
                  </div>

                  <div className="flex items-start mb-2">
                    <MapPin className="w-4 h-4 text-gray-500 mr-1 mt-0.5" />
                    <div>
                      <div className="text-sm">{service.address}</div>
                      <div className="text-sm text-gray-500">{service.distance} miles away</div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <Phone className="w-4 h-4 text-gray-500 mr-1" />
                    <div className="text-sm">{service.phone}</div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" size="sm">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 text-gray-500 mr-1" />
                      <span className={service.availability.isOpen ? "text-green-500" : "text-red-500"}>
                        {service.availability.isOpen ? "Open Now" : "Closed"}
                      </span>
                      {service.availability.hours && (
                        <span className="text-gray-500 ml-1">• {service.availability.hours}</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <Button variant="primary" size="sm" leftIcon={<Calendar size={16} />}>
                        Book Appointment
                      </Button>
                      <Button variant="outline" size="sm" leftIcon={<Phone size={16} />}>
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-8">
              <Tool className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <h3 className="text-lg font-medium text-gray-800">No Mechanics Found</h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your filters or search query to find mechanics in your area.
              </p>
              <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default MechanicFinder
