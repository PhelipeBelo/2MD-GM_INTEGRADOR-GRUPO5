import { Server } from 'socket.io';
import dotenv from 'dotenv';
// IMPORTAÇÃO: Puxa a função getConnection do seu arquivo existente
import { getConnection } from './config/database.js'; 

dotenv.config();

const SOCKET_PORT = 3010;

// 1. Setup do Socket
const io = new Server(SOCKET_PORT, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

console.log(`🚀 Nexus Socket Server rodando na porta ${SOCKET_PORT}`);

// 2. Função que busca os dados
const fetchDashboardData = async () => {
  let conn; // Variável para armazenar a conexão

  try {
    // PASSO A: Obtém uma conexão ativa do seu pool
    conn = await getConnection();

    // PASSO B: Executa as 3 queries em paralelo
    const [equipamentos, solicitacoes, emUso] = await Promise.all([
      
      // Query 1: Equipamentos + Local (Subquery)
      conn.execute(`
        SELECT 
          eg.id,
          eg.nome,
          eg.marca AS categoria,
          eg.serie AS codigo,
          eg.descricao,
          eg.foto_url,
          eg.eq_status AS status,
          (SELECT local_uso FROM equipamento_emp_ga 
           WHERE equipamento_id = eg.id AND status = 'Aprovado' 
           ORDER BY id DESC LIMIT 1) AS local
        FROM equipamentos_ga eg
        ORDER BY eg.nome ASC
      `),

      // Query 2: Solicitações Pendentes (CORRIGIDA)
      conn.execute(`
        SELECT 
          eeg.id,
          eg.nome AS equipamentoNome,
          eg.serie AS codigo,  -- <--- ADICIONADO: Necessário para o card
          gl.nome AS usuario,
          eeg.local_uso AS local,
          eeg.data_criacao,    -- <--- ADICIONADO: Necessário para mostrar a data
          eeg.status
        FROM equipamento_emp_ga eeg
        INNER JOIN equipamentos_ga eg ON eeg.equipamento_id = eg.id
        INNER JOIN gl_ga gl ON eeg.gl_id = gl.id
        WHERE eeg.status = 'Pendente'
        ORDER BY eeg.data_criacao DESC
      `),

      // Query 3: Em Uso (CORRIGIDA)
      conn.execute(`
        SELECT 
          eeg.id,
          eg.nome AS equipamentoNome,
          eg.serie AS codigo,  -- <--- ADICIONADO: Necessário para o card
          gl.nome AS usuario,
          eeg.local_uso AS local,
          eeg.data_criacao AS dataInicio,
          eeg.status
        FROM equipamento_emp_ga eeg
        INNER JOIN equipamentos_ga eg ON eeg.equipamento_id = eg.id
        INNER JOIN gl_ga gl ON eeg.gl_id = gl.id
        WHERE eeg.status = 'Aprovado'
        ORDER BY eeg.data_criacao DESC
      `)
    ]);

    // Retorna os dados formatados
    return {
      equipamentos: equipamentos[0],
      solicitacoes: solicitacoes[0],
      emUso: emUso[0]
    };

  } catch (error) {
    console.error("❌ Erro no Socket Server:", error.message);
    return null;
  } finally {
    // PASSO C: Devolver a conexão para o pool
    if (conn) {
      conn.release(); 
    }
  }
};

// 3. Loop de Atualização (Definido para 5 segundos conforme seu código anterior)
setInterval(async () => {
  const data = await fetchDashboardData();
  
  if (data) {
    io.emit('atualizacao_dados', data);
    console.log(`Dados sincronizados: ${new Date().toLocaleTimeString()}`);
  }
}, 5000);