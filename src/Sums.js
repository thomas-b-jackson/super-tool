export class Sums {
  constructor(revenue,targetRevenue,adjustedRevenue) {
    this.segments = [];
    this.revenue = revenue ? revenue: 0;
    this.targetRevenue = targetRevenue ? targetRevenue: 0;
    this.adjustedRevenue = adjustedRevenue ? adjustedRevenue: 0;
  }

  add(sums) {
    this.segments.concat(sums.segments)
    this.revenue += sums.revenue
    this.targetRevenue += sums.targetRevenue
    this.adjustedRevenue += sums.adjustedRevenue
  }

  addSegment(value) {
    this.segments.push(value)
  }

  addRevenue(value) {
    this.revenue += value
  }

  addAdjustedRevenue(value) {
    this.adjustedRevenue += value
  }

  addTargetRevenue(value) {
    this.targetRevenue += value
  }

  toString() {
    return `revenue: ${this.revenue}, adjustedRevenue: ${this.adjustedRevenue}`
  }
}