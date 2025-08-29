SELECT 
        u.id, 
        u.nombre, 
        u.email, 
        r.nombre as rol, 
        u.activo 
      FROM seg_usuarios u
      LEFT JOIN seg_roles r ON u.rol_id = r.id
      ORDER BY u.id DESC
    `);