import { readFileSync } from 'fs'
import { join } from 'path'

export const rules: string[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n/)
  .slice(0, -1)

const RULE_REGEX = /^([\w\s]+)\s+contain\s+([\w\s,]+)\.$/

export const bags = parseRules()

export function searchBagOcurrencies (bag: string) {
  const bagsCopy = new Map(bags)

  bagsCopy.delete(bag)

  let ocurrencies = 0

  for (const [_bag] of bagsCopy) {
    if (checkBagRecursively(_bag, bag)) {
      ocurrencies++
    }
  }

  return ocurrencies
}

export function getDepsCount (bag: string) {
  let count = 0
  const deps = bags.get(bag)

  for (const [dep, _count] of deps) {
    count += _count + getDepsCount(dep) * _count
  }

  return count
}

function checkBagRecursively (bag: string, searchingBag: string) {
  const deps = bags.get(bag)

  if (deps.has(searchingBag)) {
    return true
  }

  for (const [dep] of deps) {
    if (checkBagRecursively(dep, searchingBag)) {
      return true
    }
  }

  return false
}

function parseRules () {
  const bags = new Map<string, Map<string, number>>()

  for (const rule of rules) {
    const { bag, deps } = parseRule(rule)
    bags.set(bag, deps)
  }

  return bags
}

function parseRule (rule: string) {
  if (!rule.match(RULE_REGEX)) {
    console.log('Wrong value:', rule)
  }

  const [_, bag, deps] = rule.match(RULE_REGEX)

  return {
    bag: bag.replace(/\s+bags?$/, ''),
    deps: parseRuleDeps(deps)
  }
}

function parseRuleDeps (deps: string) {
  const ruleDeps = new Map<string, number>()

  if (deps === 'no other bags') {
    // Empty rule deps
    return ruleDeps
  }

  return deps
    .split(',')
    .reduce((map, depRule) => {
      const [_, count] = depRule.match(/^\s*(\d+)/)

      map.set(
        depRule.replace(/^\s*\d+\s+|\s+bags?$/g, ''),
        Number(count)
      )

      return map
    }, ruleDeps)
}
