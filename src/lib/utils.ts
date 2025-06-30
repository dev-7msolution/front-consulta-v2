import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatInTimeZone } from "date-fns-tz"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | null | undefined) {
  if (!dateString) {
    return ""
  }

  try {
    // Replace hyphens with slashes to ensure parsing in the server's local time, not UTC.
    // This prevents the date from rolling back a day when converting to a timezone behind UTC.
    const localDateString = dateString.split("T")[0].replace(/-/g, "/")
    const date = new Date(localDateString)

    if (isNaN(date.getTime())) {
      return "" // or return the original string, or some default
    }
    return formatInTimeZone(date, "America/Sao_Paulo", "dd/MM/yyyy")
  } catch (error) {
    console.error("Error formatting date:", error)
    return "" // Or handle the error as you see fit
  }
}

export function formatDateTime(dateString: string | null | undefined) {
  if (!dateString) {
    return ""
  }

  try {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return ""
    }
    return formatInTimeZone(date, "America/Sao_Paulo", "dd/MM/yyyy HH:mm")
  } catch (error) {
    console.error("Error formatting date and time:", error)
    return ""
  }
}

export function formatCPF(cpf: string | null | undefined) {
  if (!cpf) {
    return ""
  }

  // Remove all non-digit characters
  const cpfOnlyNumbers = cpf.replace(/\D/g, "")

  // Apply the mask
  return cpfOnlyNumbers.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  )
}
