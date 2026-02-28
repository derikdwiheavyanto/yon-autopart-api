

export function buildSchema({ tags, summary, body, response }: { tags: any[], summary: string, body: any, response: any }) {
    return {
        tags: tags,
        summary: summary,
        body: body,
        response: response
    }
}