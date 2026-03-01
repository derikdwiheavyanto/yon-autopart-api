

export function buildSchema({ tags, summary, body = null, security = true, response }: { tags: any[], summary: string, body?: any, security?: boolean, response: any }) {

    const securityBearer = {
        security: [{ bearerAuth: [] }]
    }

    return {
        tags: tags,
        summary: summary,
        ...(security && securityBearer),
        ...(body && { body }),
        response: response
    }
}