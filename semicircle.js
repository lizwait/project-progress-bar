import { graphql } from "@octokit/graphql"
import stuff from "./secrets.json" assert { type: 'json' }

const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: 'token '+stuff.secret,
    },
  });

const { totalClosed } = await graphqlWithAuth (
  `{
    repository(owner: "lizwait", name: "project-progress-bar") {
      issues(states: CLOSED) {
        totalCount
      }
    }
  }`
);

const { total } = await graphqlWithAuth (
  `{
    repository(owner: "lizwait", name: "project-progress-bar") {
      issues(first: 100) {
        totalCount
      }
    }
  }`
)

console.log(totalClosed)
console.log(total)
