import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    if (req.method === 'POST') {
      const { apiKey } = await req.json()
      
      // Store the API key as a secret
      const { error } = await supabaseClient
        .rpc('set_secret', {
          name: 'OPENAI_API_KEY',
          value: apiKey
        })

      if (error) throw error

      return new Response(
        JSON.stringify({ message: 'API key stored successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // For GET requests, retrieve the API key
    const { data, error } = await supabaseClient
      .rpc('get_secret', { name: 'OPENAI_API_KEY' })

    if (error) throw error

    return new Response(
      JSON.stringify({ key: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})